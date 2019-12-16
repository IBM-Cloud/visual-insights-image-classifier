var classifyBtn = document.getElementById("classifybtn");
function classifyImageWithTensorflow() {
    const img = document.getElementById('uploadedimage');
    var modalDlg = document.getElementById('modal');
    var table = document.getElementById('table').getElementsByTagName('tbody')[0];
    // Load the model.
    mobilenet.load().then(model => {
        // Classify the image.
        model.classify(img).then(predictions => {
            console.log('Predictions: ');
            console.log(predictions);
            table.innerHTML="";
            for (var i = 0; i < predictions.length; i++) {
                var tr = document.createElement('tr');
                var category = predictions[i]["className"];
                var confidence = predictions[i]["probability"].toFixed(5);
                var tdCategory = tr.appendChild(document.createElement('td'));
                tdCategory.innerHTML = category;
                var tdConfidence = tr.appendChild(document.createElement('td'));
                tdConfidence.innerHTML = confidence;
                table.appendChild(tr);
            }
            modalDlg.classList.add('is-active');
        });
    });
    classifyBtn.setAttribute("disabled", "");
    modal.removeAttribute("is-active");
    var imageModalCloseBtn = document.querySelector('#modal-close');
    imageModalCloseBtn.addEventListener('click', function() {
        modalDlg.classList.remove('is-active');
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
            const fileName = document.querySelector('#file-js-example .file-name');
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