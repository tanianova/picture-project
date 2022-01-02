const drop = () => {
    const fileinputs = document.querySelectorAll('[name="upload"]');
    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileinputs.forEach(input => {
            addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();

    }

    function highlight(item) {
        item.closest('.file_upload').style.border = '5px solid yellow';
        item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0,.7)';
    }

    function unHighlight(item) {
        item.closest('.file_upload').style.border = 'none';
        item.closest('.file_upload').style.backgroundColor = 'initial';
    }


    ['dragenter', 'dragover', ].forEach(eventName => {
        fileinputs.forEach(input => {
            addEventListener(eventName, () => highlight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileinputs.forEach(input => {
            addEventListener(eventName, () => unHighlight(input), false);
        });
    });
    fileinputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;
            let dots;
            const arr = input.files[0].name.split('.');
            arr[0].length > 6 ? dots = "..." : dots = ".";
            const name = arr[0].substring(0,7) + dots + arr[1];
            input.previousElementSibling.textContent=name;
        });
    });
};
export default drop;