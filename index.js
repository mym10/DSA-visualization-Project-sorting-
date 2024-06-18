var container = document.getElementById("ground");
function generateArray() {
    //say i want 12 elements in my array
    for(var i=0; i<20; i++) {
        //generate a random value between 10-100
        var value = Math.ceil(Math.random()*100);
        //now each value should be a block, creating a div
        var array_element = document.createElement("div");
        //add class and style to the div
        array_element.classList.add("block");
        array_element.style.height = `${value * 3}px`;
        //add a 2D translation
        array_element.style.transform = `translate${i * 30}px` //moves x pixels horizontally and y pixels vertically

        //display the value on top of each block
        var array_element_label = document.createElement("label");
        array_element_label.classList.add("block_id");
        array_element_label.innerText=value;

        //append the created elements to index.html
        array_element.appendChild(array_element_label);
        container.appendChild(array_element);
    }
}

function swap(a, b) {
    return new Promise((resolve) => {
        var temp = a.style.transform;
        a.style.transform = b.style.transform;
        b.style.transform = temp;
        //animation during the swap
        window.requestAnimationFrame(function () {
            //time delay us .25 sec
            setTimeout(() => {
                container.insertBefore(b, a);
                resolve();
            }, 250);
        });
    });
}

async function bubbleSort(delay=100) {
    var blocks = document.querySelectorAll(".block") //select everything under the class block and call them blocks
    for(var i=0; i<blocks.length; i++) {
        for(var j=0; j<blocks.length-i-1; j++) {
            //color both the selected blocks
            blocks[j].style.backgroundColor = "green";
            blocks[j+1].style.backgroundColor = "green";
            //wait for a sec
            await new Promise((resolve) => setTimeout(() => {
                resolve();
            }, delay)); 
            //convert the selected blocks into values (number)
            var value1= Number(blocks[j].childNodes[0].innerHTML);
            var value2=Number(blocks[j+1].childNodes[0].innerHTML);
            //compare the values
            if(value1>value2) {
                await swap(blocks[j], blocks[j+1]);
                blocks = document.querySelectorAll(".block")
            }
            //change the colors back to normal
            blocks[j].style.backgroundColor = "blue";
            blocks[j+1].style.backgroundColor = "blue";
        }
        //after sorting, make the last one a different color
        blocks[blocks.length-i-1].style.backgroundColor="red";
    }
}
generateArray();
bubbleSort();