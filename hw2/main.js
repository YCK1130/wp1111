// var participant_data = [
//     {
//         first_name:"人員",
//         last_name:"1",
//         id:"1",
//         img_url:none,
//         on_screen:true,
//     },
// ]

var color_pool = ["rgb(0, 89, 255)","rgb(114, 86, 141)","rgb(2, 136, 83)","rgb(181, 175, 5)","rgb(11, 161, 6)"];

var num_people = 1;
var total_people = 1;
var screen_view = "focus"; //focus or normal
var people_on_screen = ["person1"]; //record #id

const side_max_num = 6;
var normal_parent = document.getElementById('main');
var focus_parent = document.getElementById("thumbnail-container");

const template_node = document.getElementById("person1");
var more_num = -5;
var more_num_block = document.getElementById("person1").cloneNode(true);
more_num_block.querySelector(".close-sign").remove();
more_num_block.querySelector(".mute-sign").remove();
more_num_block.querySelector(".tool-box").remove();
more_num_block.querySelector(".left-bottom").remove();
more_num_block.insertBefore(document.createElement('div'),more_num_block.querySelector(".middle-box"));
more_num_block.id = "more_num_block";

console.log(more_num_block);
// var
var store_node = [];

function add_people(){
    total_people++;
    more_num++;
    let parent = (screen_view==="focus")?focus_parent:normal_parent;

    if(total_people == 7 && screen_view==="focus"){
        // total_people = 5;
        more_num = 2;
        store_node.push(document.querySelector(`#${people_on_screen[5]}`).cloneNode(true));
        document.querySelector(`#${people_on_screen[5]}`).remove();
        people_on_screen = people_on_screen.filter((item, index, array) => index !== 5);
        parent.appendChild(more_num_block.cloneNode(true));
        document.querySelector("#more_num_block .avatar").innerHTML = `+${more_num}`;
        return;
    }

    if(more_num>1){
        document.querySelector("#more_num_block .avatar").innerHTML = `+${more_num}`;
        return;
    }

    var new_node = template_node.cloneNode(true);
    num_people++;

    new_node.id = "person" + num_people;
    // console.log(new_node);
    people_on_screen.push(new_node.id);
    parent.appendChild(new_node);
    // console.log(`#${new_node.id} .tool-checkbox.pin`);
    //pin
    document.querySelector(`#${new_node.id} .tool-checkbox.pin`).id = `pin${num_people}`;
    document.querySelector(`#${new_node.id} .tool-checkbox.pin ~ .tool`).setAttribute("for",`pin${num_people}`);
    //dashboard
    document.querySelector(`#${new_node.id} .tool-checkbox.dashboard`).id = `dashboard${num_people}`;
    document.querySelector(`#${new_node.id} .tool-checkbox.dashboard ~ .tool`).setAttribute("for",`dashboard${num_people}`);
    //close-full-screen
    document.querySelector(`#${new_node.id} .tool-checkbox.close-full-screen`).id = `close-full-screen${num_people}`;
    document.querySelector(`#${new_node.id} .tool-checkbox.close-full-screen ~ .tool`).setAttribute("for",`close-full-screen${num_people}`);

    re_display();
}
const empty_list = [];
function delete_node(id){
    let parent = (screen_view==="focus")?focus_parent:normal_parent;
    console.log(id);
    people_on_screen = people_on_screen.filter((item, index, array) => item !== id);
    document.getElementById(id).remove();
    total_people--;
    more_num--;
    console.log(store_node);
    if(more_num>1){
        document.querySelector("#more_num_block .avatar").innerHTML = `+${more_num}`;
        if(store_node.length!=0){
            parent.insertBefore(store_node.shift(),document.querySelector("#more_num_block"));
            return;
        }
        var new_node = template_node.cloneNode(true);
        num_people++;
        
        new_node.id = "person" + num_people;
        // console.log(new_node);
        people_on_screen.push(new_node.id);
        parent.insertBefore(new_node,document.querySelector("#more_num_block"));
        // console.log(`#${new_node.id} .tool-checkbox.pin`);
        //pin
        document.querySelector(`#${new_node.id} .tool-checkbox.pin`).id = `pin${num_people}`;
        document.querySelector(`#${new_node.id} .tool-checkbox.pin ~ .tool`).setAttribute("for",`pin${num_people}`);
        //dashboard
        document.querySelector(`#${new_node.id} .tool-checkbox.dashboard`).id = `dashboard${num_people}`;
        document.querySelector(`#${new_node.id} .tool-checkbox.dashboard ~ .tool`).setAttribute("for",`dashboard${num_people}`);
        //close-full-screen
        document.querySelector(`#${new_node.id} .tool-checkbox.close-full-screen`).id = `close-full-screen${num_people}`;
        document.querySelector(`#${new_node.id} .tool-checkbox.close-full-screen ~ .tool`).setAttribute("for",`close-full-screen${num_people}`);
        return;
    }
    else if (more_num===1){
        document.querySelector("#more_num_block").remove();
        if(store_node.length!=0){
            let restore_node = store_node.shift();
            parent.appendChild(restore_node);
            people_on_screen.push(restore_node.id);
            total_people--;
            more_num--;
            add_people();
        }
        else{
            total_people-=2;
            more_num-=2;
            add_people();
            add_people();
        }
    }
    re_display();
}

function re_display(){
    let parent = (screen_view==="focus")?focus_parent:normal_parent;
    let children = people_on_screen;
    children.forEach(item=>document.getElementById(item).style.width="45%");
    if(total_people%2===1 && total_people<=side_max_num && total_people>1){
        parent.lastChild.style.width = "60%";
    }

    // if(total_people>6){
    //     // let sixth_child = document.querySelector(`#${parent.id} div:nth-child(6)`);
    //     console.log(document.querySelector(`#${parent.id} div:nth-child(${total_people})`));
    //     document.querySelector(`#${parent.id} div:nth-child(${total_people})`).style.display="none";
    //     for(let i=0;i<5;i++){
    //         document.querySelector(`#${children[i]}`).style.display="grid";
    //     }
    //     // console.log(sixth_child);
    // }
    // else{
    //     children.forEach((item)=>{
    //         document.querySelector(`#${item}`).style.display="grid";
    //     });
    // }

    console.log(total_people);
    
}
