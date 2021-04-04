
function curry(func) {

    return function curried(...args) {
        if (args.length >= func.length) {
            return func.apply(this, args);
        } else {
            return function (...args2) {
                return curried.apply(this, args.concat(args2));
            }
        }
    };

}

function addBlock(parentSelector, blockTag, count) {

    if (count> 5) {
        alert('Amount of added blocks must be less than 5!');
        return;
    }

    let parents = document.querySelectorAll(parentSelector);
    if (!parents.length) {
        console.log('Parent not found! Block is not added!');
    }

    parents.forEach(parent => {
        try {
            for (let i = 0; i < count; i++) {

                let block = createBlock(blockTag);

                parent.append(block);
                parent.classList.add('parent');

                createDeleteBtn(block);
            }
        } catch (error) {
            console.error(error.message);
        }
    });
}

function createBlock(tag) {

    let block = document.createElement(tag);
    block.classList.add('block');
    block.innerHTML = tag;

    return block;
}

function createDeleteBtn(parent) {

    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.addEventListener('click', deleteBlock);
    parent.append(deleteBtn);

}

function deleteBlock(event) {
    try {
        if (event.currentTarget.parentNode.classList.contains('block')) {
            event.currentTarget.parentNode.remove();
        }
    } catch (error) {
        console.error(error.message);
    }
}

let curriedAddBlock = curry(addBlock);
curriedAddBlock('body')('div')(3);
curriedAddBlock('div')('span')(2);
curriedAddBlock('div > span')('span')(1);
