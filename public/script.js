
$('body').on('click', (e) => {
    // e.preventDefault();

    if(e.target.id =='none'){
        reset();
        $("#new-note").show();
        $('#list-note').hide();
        
   
    }
    if (e.target.id == 'new-title') {
        $("#new-note").hide();
        $('#list-note').show();
    }

    if (e.target.id == '.editPost') {
        console.log(e.target.attributes['data-id'].value);
        let id = e.target.attributes['data-id'].value;
        window.location.replace("/posts/" + id);
    }


    console.log(e.target.id);

    // if (e.target.id == 'new-title') {
    //     $("#new-title").attr("placeholder", "Title");
    //     $("#new-title").removeAttr("id");

    //     let newLi = document.createElement('li');
    //     newLi.innerHTML = '<input class="form-control border border-light mb-1 new-item" id ="new-item" type="text" autocomplete="off" name="postBody" placeholder="+ New list item" required />';
    //     listItems.appendChild(newLi);
    // }

})

// $('#new-note').on('click', (e) => {
//     $("#new-note").attr("placeholder", "Title");
//     $("#new-note").removeAttr("id");

//     let newLi = document.createElement('li');
//     newLi.innerHTML = '<input class="form-control border border-light mb-1 new-item" id ="new-item" type="text" autocomplete="off" name="postBody" placeholder="+ New list item" required />';
//     listItems.appendChild(newLi);

// });


$("table").on("click", ".editPost", (e) => {
    e.preventDefault();
    console.log(e.target.attributes['data-id'].value);
    let id = e.target.attributes['data-id'].value;
    window.location.replace("/posts/" + id);
    // GetPost(id);

});

$("table").on("click", ".removePost", (e) => {
    // e.preventDefault();

    console.log(e.target.attributes['data-id'].value);
    let id = e.target.attributes['data-id'].value;
    DeletePost(id);
});

function GetPost(id) {
    $.ajax({
        url: "/posts/" + id,
        type: "GET",
        contentType: "application/json",
        success: (post) => {
            // window.location.replace("/addNewNote");
            // console.log('------------',post._id, post.title, post.body)
            // let form = document.forms["postForm"];
            // form.elements["id-note"].value = post._id;
            // form.elements["postName"].value = post.title;
            // form.elements["postBody"].value = post.body;

        }
    });
}

function CreatePost(title, body) {
    $.ajax({
        url: "/posts",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify({
            title: title,
            body: body,
            typeNote: 'note'
        }),
        success: () => {
            reset();
            window.location.replace("/")
        }
    })
}

function EditPost(id, title, body) {
    $.ajax({
        url: "/posts",
        contentType: "application/json",
        method: "PUT",
        data: JSON.stringify({
            id: id,
            title: title,
            body: body
        }),
        success: () => {
            // reset();
            // window.location.replace("/EditNote")

        }
    })
}

function DeletePost(id) {
    $.ajax({
        url: "/posts/" + id,
        contentType: "application/json",
        method: "DELETE",
        success: (post) => {
            console.log(post);
            // reset();
            window.location.replace("/")
        }
    })
}

function reset() {
    let form = document.forms["postForm"];
    form.elements["id-note"].value = 0;
    form.elements["postName"].value = '';
    $('#listItems').html('<li> <input class="form-control border border-light mb-1 new-item" id ="new-item" type="text" autocomplete="off" name="postBody" placeholder="+ New list item" required /></li>');
            


    // form.elements["postBody"].length = 0;
    
    // for (let index = 0; index < form.elements["postBody"].length; index++) {
    //     // form.elements["postBody"][index].pop();
    //     console.log(form.elements["postBody"][index]);
    // }

    
 
}

function CreateListsNote(title, body) {
    $.ajax({
        url: "/posts",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify({
            title: title,
            body: body,
            typeNote: 'lists'
        }),
        success: () => {
            reset();
            window.location.replace("/");
        }
    })

}

$('#listItems').on('click', (e) => {
    e.preventDefault();

    if (e.target.id == 'new-item') {
        $('#new-item').one('keyup', (e) => {
            $("#new-item").removeAttr("id");
            let newLi = document.createElement('li');
            newLi.innerHTML = '<input class="form-control border border-light mb-1 new-item" id ="new-item" type="text" autocomplete="off" name="postBody" placeholder="+ New list item" required />';
            listItems.appendChild(newLi);
        });
    }

})

$("#save-form").on("click", (e) => {
    e.preventDefault();

    let form = document.forms["postForm"];
    let id = form.elements["id-note"].value;
    let typeNote = form.elements["type-note"].value;
    let title = form.elements["postName"].value;
    let body;
    if (typeNote == 'note') {

        body = form.elements["postBody"].value;
        console.log(body);
        if (id == 0) {
            CreatePost(title, body);
        } else {
            EditPost(id, title, body);
        }
    } if (typeNote == 'list') {

        body = [];
        form.elements["postBody"].forEach(element => {
            if (element.value == "") return;
            body.push(element.value)
        });

        if (id == 0) {
            CreateListsNote(title, body);
        } else {
            EditPost(id, title, body);
        }
    }
});


$("#reset").click((e) => {
    e.preventDefault();
    reset();
    window.location.replace("/")
});

// ----

$("#add-note").click((e) => {
    window.location.replace("/addNewNote")
})

$("#add-lists-note").click((e) => {
    window.location.replace("/lists")
})
