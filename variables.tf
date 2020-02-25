variable "ibmcloud_api_key" {
}

variable "ssh_key_name" {
}

variable "resource_group_name" {
}

variable "vpc_id" {
}

variable "generation" {
  default = "2"
}

variable "ibmcloud_timeout" {
  description = "Timeout for API operations in seconds."
  default     = 900
}

variable "region" {
  default = "us-south"
}

variable "zone" {
  default = "us-south-1"
}

variable "basename" {
  description = "Name for the VPC to create and prefix to use for all other resources."
  default     = "powerai-vision"
}

variable "ssh_private_key_file_path" {
  description = "Path to the SSH private key file on your local computer E.g., ~/.ssh/id_rsa"
}

variable "powerai_vision_api_url" {
  description = "The URL of backend PowerAI vision trial API"
}