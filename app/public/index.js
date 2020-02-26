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
      error: function(xhr) {
        $("p.error").text(xhr.status);
      },
      success: function(response) {
        $("#classifybtn").removeClass("is-loading");
        $("#classifybtn").attr("disabled", true);
        console.log(response);
        var parsedJSON = JSON.parse(response.data);
        if (parsedJSON.result == "success") {
          console.log(parsedJSON.classified);
          var classifiedCategory =
            Object.keys(parsedJSON.classified)[0] == "_negative_"
              ? "Uncategorized"
              : Object.keys(parsedJSON.classified)[0];
          var confidence = parseFloat(Object.values(parsedJSON.classified)[0]);
          $("#table tbody").append(
            "<tr><td>" +
              classifiedCategory +
              "</td><td>" +
              (confidence * 100).toFixed(2) +
              " %</td></tr>"
          );
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

//TODO: Remove
var classifyBtn = document.getElementById("classifybtn");
function classifyImageWithTensorflow() {
  const img = document.getElementById("uploadedimage");
  var modalDlg = document.getElementById("modal");
  var table = document.getElementById("table").getElementsByTagName("tbody")[0];
  classifyBtn.classList.add("is-loading");
  // Load the model.
  mobilenet.load().then(model => {
    // Classify the image.
    model.classify(img).then(predictions => {
      console.log("Predictions: ");
      console.log(predictions);
      table.innerHTML = "";
      for (var i = 0; i < predictions.length; i++) {
        var tr = document.createElement("tr");
        var category = predictions[i]["className"];
        var confidence = predictions[i]["probability"].toFixed(5);
        var tdCategory = tr.appendChild(document.createElement("td"));
        tdCategory.innerHTML = category;
        var tdConfidence = tr.appendChild(document.createElement("td"));
        tdConfidence.innerHTML = confidence;
        table.appendChild(tr);
      }
      modalDlg.classList.add("is-active");
      classifyBtn.classList.remove("is-loading");
    });
  });
  classifyBtn.setAttribute("disabled", "");
  modal.removeAttribute("is-active");
  var imageModalCloseBtn = document.querySelector("#modal-close");
  imageModalCloseBtn.addEventListener("click", function() {
    modalDlg.classList.remove("is-active");
  });
}

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
