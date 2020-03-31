variable "ibmcloud_api_key" {
  description = "Enter the IBM Cloud API key. Use the same API key used with Visual Insights backend"
}

variable "vpc_id" {
  description = "Target VPC gen 2 with this command - ibmcloud is target --gen 2 and retrieve the VPC ID - ibmcloud is vpcs"
}

variable "visual_insights_model_api_url" {
  description = "The API URL of backend Visual Insights "
}

/*variable "resource_group_name" {
  description = "Name of the resource group to provision the resources. For resource group name, Run this command - ibmcloud resource groups"
  default = "Default"
}*/

variable "ibmcloud_timeout" {
  description = "Timeout for API operations in seconds."
  default     = 900
}

variable "region" {
  description = "Should be same as the Visual Insights region"
  default = "us-south"
}

variable "zone" {
  description = "Should be same as the Visual Insights zone"
  default = "us-south-2"
}

variable "basename" {
  description = "prefix for all the VPC resources created for frontend web app"
  default     = "ibm-visual-insights-web"
}

variable "image_name" {
  description = "Name of the base image for the virtual server (should be an Ubuntu 18.04 base)"
  default = "ibm-ubuntu-18-04-1-minimal-amd64-1"
}

variable "profile_name" {
  description = "Name of the instance profile"
  default = "cx2-2x4"
}
