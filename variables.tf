variable "ibmcloud_api_key" {
  description = "Enter the IBM Cloud API key. Use the same API key used with PowerAI vision trial backend"
}

variable "ssh_key_name" {
  description = "Name of your SSH key created under VPC"
}

variable "resource_group_name" {
  description = "Name of the resource group to provision the resources"
  default = "default"
}

variable "vpc_id" {
  description = "Retrieve the VPC ID by running the command - ibmcloud is vpcs"
}

variable "generation" {
  description = "VPC generation to provision the resources"
  default = "2"
}

variable "ibmcloud_timeout" {
  description = "Timeout for API operations in seconds."
  default     = 900
}

variable "region" {
  description = "Should be same as the PowerAI vision region"
  default = "us-south"
}

variable "zone" {
  description = "Should be same as the PowerAI vision zone"
  default = "us-south-1"
}

variable "basename" {
  description = "Name for the VPC to create and prefix to use for all other resources."
  default     = "powerai-vision"
}

variable "ssh_private_key_file_path" {
  description = "Path to the SSH private key file on your local computer e.g., ~/.ssh/id_rsa"
}

variable "powerai_vision_api_url" {
  description = "The URL of backend PowerAI vision trial API"
}