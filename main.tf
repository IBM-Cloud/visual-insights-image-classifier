provider "ibm" {
  region           = var.region
  ibmcloud_api_key = var.ibmcloud_api_key
  generation       = var.generation
  ibmcloud_timeout = var.ibmcloud_timeout
}

data "ibm_resource_group" "group" {
  name = var.resource_group_name
}

resource "ibm_is_security_group" "frontend_sg" {
  name           = "${var.basename}-frontend"
  vpc            = var.vpc_id
  resource_group = data.ibm_resource_group.group.id
}

# allow ssh access to this instance from outside
resource "ibm_is_security_group_rule" "ingress_ssh_all" {
  group     = ibm_is_security_group.frontend_sg.id
  direction = "inbound"
  remote    = "0.0.0.0/0" # TOO OPEN for production

  tcp {
    port_min = 22
    port_max = 22
  }
}

resource "ibm_is_security_group_rule" "frontend_ingress_80_all" {
  group     = ibm_is_security_group.frontend_sg.id
  direction = "inbound"
  remote    = "0.0.0.0/0"

  tcp {
    port_min = 80
    port_max = 80
  }
}

// For node app
resource "ibm_is_security_group_rule" "frontend_ingress_3000_node" {
  group     = ibm_is_security_group.frontend_sg.id
  direction = "inbound"
  remote    = "0.0.0.0/0"

  tcp {
    port_min = 3000
    port_max = 3000
  }
}


resource "ibm_is_security_group_rule" "maintenance_egress_443" {
  group     = ibm_is_security_group.frontend_sg.id
  direction = "outbound"
  remote    = "0.0.0.0/0"

  tcp {
    port_min = "443"
    port_max = "443"
  }
}

resource "ibm_is_security_group_rule" "maintenance_egress_80" {
  group     = ibm_is_security_group.frontend_sg.id
  direction = "outbound"
  remote    = "0.0.0.0/0"

  tcp {
    port_min = 80
    port_max = 80
  }
}

resource "ibm_is_security_group_rule" "maintenance_egress_53" {
  group     = ibm_is_security_group.frontend_sg.id
  direction = "outbound"
  remote    = "0.0.0.0/0"

  tcp {
    port_min = 53
    port_max = 53
  }
}

resource "ibm_is_security_group_rule" "maintenance_egress_udp_53" {
  group     = ibm_is_security_group.frontend_sg.id
  direction = "outbound"
  remote    = "0.0.0.0/0"

  udp {
    port_min = 53
    port_max = 53
  }
}

resource "ibm_is_subnet" "frontend_subnet" {
  name                     = "${var.basename}-frontend-subnet"
  vpc                      = var.vpc_id
  zone                     = var.zone
  total_ipv4_address_count = 256
}

data "ibm_is_ssh_key" "ssh_key" {
  name = var.ssh_key_name
}

data "ibm_is_image" "ubuntu" {
  name = "ibm-ubuntu-18-04-1-minimal-amd64-1"
}

resource "ibm_is_instance" "frontend_vsi" {
  name           = "${var.basename}-frontend-vsi"
  vpc            = var.vpc_id
  zone           = var.zone
  keys           = [data.ibm_is_ssh_key.ssh_key.id]
  image          = data.ibm_is_image.ubuntu.id
  profile        = "cx2-2x4"
  resource_group = data.ibm_resource_group.group.id

  primary_network_interface {
    subnet          = ibm_is_subnet.frontend_subnet.id
    security_groups = [ibm_is_security_group.frontend_sg.id]
  }
}

resource "ibm_is_floating_ip" "frontend_fip" {
  name   = "${var.basename}-frontend-fip"
  target = ibm_is_instance.frontend_vsi.primary_network_interface[0].id
}

resource "null_resource" "provisioners" {
  connection {
    type    = "ssh"
    user    = "root"
    timeout = "2m"
    host    = ibm_is_floating_ip.frontend_fip.address
    private_key = file("${var.ssh_private_key_file_path}")
  }

  provisioner "file" {
    source      = "app"
    destination = "/tmp"
  }

  provisioner "remote-exec" {
    inline = [
      "export DEBIAN_FRONTEND=noninteractive",
      "export POWERAI_VISION_API_URL=${var.powerai_vision_api_url}",
      "apt -y update && apt -y upgrade",
      "apt -y install nodejs",
      "apt -y install npm",
      "cd /tmp/app/",
      "npm install",
      "sudo npm install pm2 -g",
      "pm2 start app.js"
    ]
  }
}

output "access" {
  value =" Access your application at http://${ibm_is_floating_ip.frontend_fip.address}:3000"
}

output "sshcommand" {
  value = "ssh root@${ibm_is_floating_ip.frontend_fip.address}"
}

