let shelfs = [];

addShelf();

function addShelf() {
    shelfs.push({
        bricks: [],
        shelfLink: document.createElement("div"),
        thisBricksCount: document.createElement("div"),
        thisDeleteBrick: document.createElement("button")
    });

    let neededShelf = shelfs[shelfs.length - 1].shelfLink;
    neededShelf.classList.add("shelf");
    $(".field").append(neededShelf);

    $(shelfs[shelfs.length - 1].thisBricksCount).html("Кирпичей: " + shelfs[shelfs.length - 1].bricks.length + "/7");
    shelfs[shelfs.length - 1].thisBricksCount.classList.add("thisShelfBricksCount");
    $(neededShelf).append(shelfs[shelfs.length - 1].thisBricksCount);

    $(shelfs[shelfs.length - 1].thisDeleteBrick).html("Удалить стопку");
    shelfs[shelfs.length - 1].thisDeleteBrick.classList.add("delete");
    $(neededShelf).append(shelfs[shelfs.length - 1].thisDeleteBrick);

    $(".shelfsCounter .value").html(shelfs.length);
    $(".field").scrollLeft(neededShelf.getBoundingClientRect().right);
    console.log(shelfs[0].shelfLink);
};

function addBrick(shelf) {
    shelf.bricks.push(document.createElement("div"));
    shelf.bricks[shelf.bricks.length - 1].classList.add("brick");
    $(shelf.shelfLink).prepend(shelf.bricks[shelf.bricks.length - 1]);

    updateShelfBricksCounters();
}

function countBricks() {
    let sum = 0;
    for(let shelf of shelfs) {
        sum += shelf.bricks.length;
    }
    return sum;
}

function updateShelfBricksCounters() {
    for(let shelf of shelfs) {
        let text = "Кирпичей: " + shelf.bricks.length + "/7";
        $(shelf.thisBricksCount).html(text);

        if(shelf.bricks.length == 0) {
            $(shelf.thisDeleteBrick).html("Удалить стопку");
        }
        else {
            $(shelf.thisDeleteBrick).html("Удалить кирпич");
        }
    }
}

function buttonDelete(shelf) {
    if($(shelf.thisDeleteBrick).html() == "Удалить кирпич") {
        popBrick(shelf);
    }
    else popShelf(shelf);
}

function popBrick(shelf) {
    $(shelf.bricks[shelf.bricks.length - 1]).remove();
    shelf.bricks.pop();
    updateShelfBricksCounters();
    $(".bricksCounter .value").html(countBricks());
}

function popShelf(shelf) {
    let index = 0;
    for(let i = 0; i < shelfs.length; i++) {
        if(shelfs[i].shelfLink == shelf) {
            index = i;
        }
    }

    $(shelf.shelfLink).remove();
    shelfs.splice(index, 1);
    updateShelfBricksCounters();
    $(".shelfsCounter .value").html(shelfs.length);
}

$(".newShelf").click(function() {
    addShelf();
});

$(".newBrick").click(function() {
    let shelfsNeeded = true;
    for(let i = 0; i < shelfs.length; i++) {
        if(shelfs[i].bricks.length < 7) {
            addBrick(shelfs[i]);
            shelfsNeeded = false;
            break;
        }
    }
    
    if(shelfsNeeded) {
        addShelf();
        addBrick(shelfs[shelfs.length - 1]);
    }

    updateShelfBricksCounters();
    $(".bricksCounter .value").html(countBricks());
});

$(".field").on("click", function(event) {
    let obj;
    for(let nowShelf of shelfs) {
        if(nowShelf.thisDeleteBrick == event.target) {
            obj = nowShelf;
        }
    }
    if(obj) buttonDelete(obj);    
});