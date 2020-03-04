variable "ibmcloud_api_key" {
  description = "Enter the IBM Cloud API key. Use the same API key used with PowerAI vision trial backend"
}

variable "vpc_id" {
  description = "Retrieve the VPC ID by running the command - ibmcloud is vpcs"
}

variable "powerai_vision_api_url" {
  description = "The URL of backend PowerAI vision trial API"
}

variable "resource_group_name" {
  description = "Name of the resource group to provision the resources"
  default = "Default"
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
  description = "prefix for all the VPC resources created for frontend web app"
  default     = "powerai-vision-ui"
}

variable "image_name" {
  description = "Name of the base image for the virtual server (should be an Ubuntu 18.04 base)"
  default = "ibm-ubuntu-18-04-1-minimal-amd64-1"
}

variable "profile_name" {
  description = "Name of the instance profile"
  default = "cx2-2x4"
}
