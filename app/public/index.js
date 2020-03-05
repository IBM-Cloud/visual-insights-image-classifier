$(document).ready(function() {
  $("p.error").text("");
  $("#classifybtn").attr("disabled", true);
  $("#file").change(function() {
    showUploadedImage(this);
  });
  $("#imageForm").submit(function() {
    $("#classifybtn").addClass("is-loading");
    $("#table tbody tr").remove();
    $(this).ajaxSubmit({
      data: { clsnum: "5", confthre: "0.1" },
      error: function(xhr) {
        $("p.error").text(xhr.status);
      },
      success: function(response) {
        $("#classifybtn").removeClass("is-loading");
        $("#classifybtn").attr("disabled", true);
        console.log(response);
        var parsedJSON = JSON.parse(response.data);
        if (parsedJSON.result == "success" && Boolean(parsedJSON.classified)) {
          console.log(parsedJSON.classified);
          var sortedArray = Object.entries(parsedJSON.classified).sort();
          var sortedResponseObject = Object.fromEntries(sortedArray);
          console.log();
          for (i = 0; i < Object.keys(sortedResponseObject).length; i++) {
            var classifiedCategory =
              Object.keys(sortedResponseObject)[i] == "_negative_"
                ? "Uncategorized"
                : Object.keys(sortedResponseObject)[i];
            var confidence = parseFloat(Object.values(sortedResponseObject)[i]);
            $("#table tbody").append(
              "<tr><td>" +
                classifiedCategory +
                "</td><td>" +
                (confidence * 100).toFixed(2) +
                " %</td></tr>"
            );
          }
          $("#modal").addClass("is-active");
          $("#modal-close").on("click", function() {
            $("#modal").removeClass("is-active");
          });
        } else if (parsedJSON.result == "fail") {
          $("p.error").text(parsedJSON.fault);
        } else {
          $("p.error").text(parsedJSON.error);
        }
      }
    });
    return false;
  });
});

// Shows the preview of uploaded image
function showUploadedImage(fileInput) {
  var files = fileInput.files;
  if (files.length > 0) {
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var imageType = /image.*/;
      if (!file.type.match(imageType)) {
        continue;
      }
      const fileName = document.querySelector("#file-js-example .file-name");
      fileName.textContent = files[0].name;
      var img = document.getElementById("uploadedimage");
      img.file = file;
      var reader = new FileReader();
      reader.onload = (function(aImg) {
        return function(e) {
          aImg.src = e.target.result;
          classifyBtn.removeAttribute("disabled");
        };
      })(img);
      reader.readAsDataURL(file);
    }
  }
}
