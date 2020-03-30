# Image classification with IBM Visual Insights and IBM Cloud Schematics

Using the Terraform template in this repository provision a dedicated backend virtual server instance (VSI) of IBM Visual Insights (previously PowerAI Vision) in IBM Cloud Virtual Private Cloud(VPC) through IBM Cloud Schematics. Once provisioned, you will upload an image data set, train, deploy, and test an optimized deep learning (image classification) model through a GPU on the VSI. You will also deploy a front-end web application through IBM Cloud Schematics to a new VSI on the same IBM Cloud VPC. Once deployed, you will upload an image for classification by communicating with the backend deployed model exposed an an API.

> For step-by-step instructions, refer this tutorial - Computer Vision with Visual Insights and Schematics

# License

See [License.txt](License.txt) for license information.