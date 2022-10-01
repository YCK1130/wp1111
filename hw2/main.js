var store_data = [];

var color_pool = ["rgb(0, 89, 255)","rgb(114, 86, 141)","rgb(2, 136, 83)","rgb(181, 175, 5)","rgb(11, 161, 6)"];

var num_people = 1;
var total_people = 1;
var screen_view = "focus"; //focus or normal
var people_on_screen = ["person1"]; //record #id

const side_max_num = 6;
var normal_parent = document.getElementById('main');
var focus_parent = document.getElementById("thumbnail-container");

const template_node = document.getElementById("person1");
var temp_node = document.getElementById("person1").cloneNode(true);
temp_node.className="normal-person-block";
const normal_template_node = temp_node;

var more_num = -4;
var more_num_block = document.getElementById("person1").cloneNode(true);
more_num_block.querySelector(".close-sign").remove();
more_num_block.querySelector(".mute-sign").remove();
more_num_block.querySelector(".tool-box").remove();
more_num_block.querySelector(".left-bottom").remove();
more_num_block.insertBefore(document.createElement('div'),more_num_block.querySelector(".middle-box"));
more_num_block.id = "more_num_block";

// var
var store_node = [];
re_display();

function add_people(){
    total_people++;
    more_num++;
    let parent = (screen_view==="focus")?focus_parent:normal_parent;
    let template = (screen_view==="focus")?template_node:normal_template_node;

    if(total_people == 7 && screen_view==="focus"){
        // total_people = 5;
        // more_num = 2;
        store_node.push(document.querySelector(`#${people_on_screen[5]}`).cloneNode(true));
        document.querySelector(`#${people_on_screen[5]}`).remove();
        people_on_screen = people_on_screen.filter((item, index, array) => index !== 5);
        parent.appendChild(more_num_block.cloneNode(true));
        document.querySelector("#more_num_block .avatar").innerHTML = `+${more_num}`;
        // console.log(num_people,total_people,more_num,people_on_screen);
        return;
    }

    if(more_num>1 && screen_view==="focus"){
        if(document.getElementById("more_num_block")){
            
            document.querySelector("#more_num_block .avatar").innerHTML = `+${more_num}`;
        }else{
            // console.log(num_people,total_people,more_num,people_on_screen);
            console.log("hi");
        }// console.log(num_people,total_people,more_num,people_on_screen);
        return;
    }

    var new_node = template.cloneNode(true);
    num_people++;

    new_node.id = "person" + num_people;
    people_on_screen.push(new_node.id);
    parent.appendChild(new_node);
    //pin
    new_node.querySelector(`.tool-checkbox.pin`).id = `pin${num_people}`;
    new_node.querySelector(`.tool-checkbox.pin ~ .tool`).setAttribute("for",`pin${num_people}`);
    //dashboard
    new_node.querySelector(`.tool-checkbox.dashboard`).id = `dashboard${num_people}`;
    new_node.querySelector(`.tool-checkbox.dashboard ~ .tool`).setAttribute("for",`dashboard${num_people}`);
    //close-full-screen
    new_node.querySelector(`.tool-checkbox.close-full-screen`).id = `close-full-screen${num_people}`;
    new_node.querySelector(`.tool-checkbox.close-full-screen ~ .tool`).setAttribute("for",`close-full-screen${num_people}`);
    //name
    new_node.querySelector(`.avatar`).innerHTML = `M${num_people}`;
    new_node.querySelector(`.name`).innerHTML = `Member ${num_people}`;

    if(store_data.length!=0){
        change_data(new_node.id,store_data.shift());
    }
    re_display();
}
const empty_list = [];

function delete_node(id){
    let parent = (screen_view==="focus")?focus_parent:normal_parent;
    people_on_screen = people_on_screen.filter((item, index, array) => item !== id);
    document.getElementById(id).remove();
    total_people--;
    more_num--;
    if(screen_view==="focus"){
        if(more_num>1){
            document.querySelector("#more_num_block .avatar").innerHTML = `+${more_num}`;
            if(store_node.length!=0){
                let inserting_node = store_node.shift();
                parent.insertBefore(inserting_node,document.querySelector("#more_num_block"));
                people_on_screen.push(inserting_node.id);
                re_display();
                return;
            }
            var new_node = template_node.cloneNode(true);
            num_people++;
            
            new_node.id = "person" + num_people;
            people_on_screen.push(new_node.id);
            parent.insertBefore(new_node,document.querySelector("#more_num_block"));
            //pin
            new_node.querySelector(`.tool-checkbox.pin`).id = `pin${num_people}`;
            new_node.querySelector(`.tool-checkbox.pin ~ .tool`).setAttribute("for",`pin${num_people}`);
            //dashboard
            new_node.querySelector(`.tool-checkbox.dashboard`).id = `dashboard${num_people}`;
            new_node.querySelector(`.tool-checkbox.dashboard ~ .tool`).setAttribute("for",`dashboard${num_people}`);
            //close-full-screen
            new_node.querySelector(`.tool-checkbox.close-full-screen`).id = `close-full-screen${num_people}`;
            new_node.querySelector(`.tool-checkbox.close-full-screen ~ .tool`).setAttribute("for",`close-full-screen${num_people}`);
            //name
            new_node.querySelector(`.avatar`).innerHTML = `M${num_people}`;
            new_node.querySelector(`.name`).innerHTML = `Member ${num_people}`;
            if(store_data.length!=0){
                change_data(new_node.id,store_data.shift());
            }
            re_display();
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
    }
    re_display();
}

function re_display(){
    let parent = (screen_view==="focus")?focus_parent:normal_parent;
    let children = people_on_screen;
    let focus_width = 45;
    let focus_height = 27;

    let count = 1;
    let normal_width_ratio = 1;
    let normal_height_ratio = 1;
    while(count < total_people+1){
        if(normal_width_ratio-normal_height_ratio===1){
            normal_height_ratio++;
        }
        else{
            normal_width_ratio++;
        }
        count=normal_width_ratio*normal_height_ratio;
        if(count>100)break;
    }

    // console.log(normal_width_ratio,normal_height_ratio);
    
    
    if(screen_view==="focus"){
        if(total_people<4)focus_width=80;
        if(total_people<4)focus_height=80/total_people;

        children.forEach(item=>{
            document.getElementById(item).style.width=`${focus_width}%`;
            document.getElementById(item).style.height=`${focus_height}%`;
            if(total_people<4){
                let middle_len = (document.getElementById(item).clientWidth + document.getElementById(item).clientWidth)/8;
                if(total_people===1)middle_len=50;

                document.getElementById(item).querySelector(".middle-box").style.fontSize = `${middle_len/12/3.5*100*(1-Math.log10(total_people)*0.09)}%`;
                document.getElementById(item).querySelector(".name").style.fontSize = `${middle_len/12/4*100*(1-Math.log10(total_people)*0.09)}%`;
                // document.getElementById(item).querySelector(".middle-box").style.height = `${middle_len} px`;
            }
            else{
                document.getElementById(item).querySelector(".middle-box").style.fontSize = "16px";
                document.getElementById(item).querySelector(".name").style.fontSize = "12px";
            }
            document.getElementById(item).querySelector(".close-sign").style.display = (document.getElementById(item).querySelector(".name").innerHTML==="你")?"none":"flex";
        });
        

        if(total_people%2===1 && total_people<=side_max_num && total_people>4 && more_num<2){
            parent.lastChild.style.width = `${focus_width*1.25}%`;
        }

        if(total_people===0){
            document.getElementById("main").style.display ="block";
            document.getElementById("thumbnail-container").style.display = "none";
        }else{
            document.getElementById("main").style.display ="grid";
            document.getElementById("thumbnail-container").style.display = "flex";
        }
    }
    
    if(screen_view==="normal"){
        let Nodes = document.getElementsByClassName("normal-person-block");
        for(let item of Nodes){
            item.style.width = `${95/normal_width_ratio}%`;
            item.style.height = `${95/normal_height_ratio}%`;
            item.querySelector(".close-sign").style.display = (item.querySelector(".name").innerHTML==="你")?"none":"flex";
            // // console.log(item.querySelector(".middle-box"));
            // if(total_people>=8)item.querySelector(".middle-box").fontSize = `${5/6}%`;
            // if(total_people>=19)item.querySelector(".middle-box").fontSize = `${4/6}%`;
        }
        
    }
    change_mic_status();
    // console.log(num_people,total_people,more_num,people_on_screen);
}

function change_mic_status(){
    let Names = document.getElementsByClassName("name");
    for(let name of Names){
        if(!document.getElementById("keyboard_voice").checked&&name.innerHTML==="你"){
            console.log("hi");
            name.parentNode.parentNode.querySelector(".mic").style.display = "none";
            console.log(name.parentNode.parentNode.querySelector(".mic").parentNode);
            console.log(name.parentNode.parentNode.style.backgroundColor);
            name.parentNode.parentNode.querySelector(".mic").parentNode.style.backgroundColor="inherit";
        }
        else{
            name.parentNode.parentNode.querySelector(".mic").parentNode.style.backgroundColor = (name.parentNode.parentNode.id==="anchored-person")?"rgb(61,64,67)":"rgb(32,33,36)";
            name.parentNode.parentNode.querySelector(".mic").style.display = "block";
        }
    }
    document.querySelector("#mic-block  .tooltip").innerHTML= (document.getElementById("keyboard_voice").checked)?("開啟麥克風(Ctrl+D)"):("關閉麥克風(Ctrl+D)")
}

function switch_anchored(id){
    let anchored_data = {
        name : document.getElementById("anchored-person").querySelector(".name").innerHTML,
        avatar_text :document.getElementById("anchored-person").querySelector(".avatar").innerHTML,
        avatar_color :document.getElementById("anchored-person").querySelector(".avatar").style.backgroundColor,
    }
    let target_data ={
        name : document.getElementById(id).querySelector(".name").innerHTML,
        avatar_text :document.getElementById(id).querySelector(".avatar").innerHTML,
        avatar_color :document.getElementById(id).querySelector(".avatar").style.backgroundColor,
    }


    document.getElementById("anchored-person").querySelector(".name").innerHTML = target_data.name;
    document.getElementById("anchored-person").querySelector(".avatar").innerHTML = target_data.avatar_text;
    document.getElementById("anchored-person").querySelector(".avatar").style.backgroundColor = target_data.avatar_color;

    document.getElementById(id).querySelector(".name").innerHTML = anchored_data.name;
    document.getElementById(id).querySelector(".avatar").innerHTML = anchored_data.avatar_text;
    document.getElementById(id).querySelector(".avatar").style.backgroundColor = anchored_data.avatar_color;
    
    
    document.getElementById(id).querySelector(".close-sign").style.display = (anchored_data.name==="你")?"none":"flex";
    change_mic_status();
    // console.log(anchored_data,target_data)
}
function unanchored(){
    let parent = normal_parent;
    let anchored_data = {
        name : document.getElementById("anchored-person").querySelector(".name").innerHTML,
        avatar_text :document.getElementById("anchored-person").querySelector(".avatar").innerHTML,
        avatar_color :document.getElementById("anchored-person").querySelector(".avatar").style.backgroundColor,
    }
    document.getElementById("anchored-person").style.display = "none";
    document.getElementById("thumbnail-container").style.display = "none";
    document.getElementById("main").style.display ="flex";
    if(document.getElementById("more_num_block"))document.getElementById("more_num_block").remove();

    var new_node = normal_template_node.cloneNode(true);
    num_people++;
    new_node.id = "person" + num_people;
    
    new_node.querySelector(".name").innerHTML = anchored_data.name;
    new_node.querySelector(".avatar").innerHTML = anchored_data.avatar_text;
    new_node.querySelector(".avatar").style.backgroundColor = anchored_data.avatar_color;

    //pin
    new_node.querySelector(`.tool-checkbox.pin`).id = `pin${num_people}`;
    new_node.querySelector(`.tool-checkbox.pin ~ .tool`).setAttribute("for",`pin${num_people}`);
    //dashboard
    new_node.querySelector(`.tool-checkbox.dashboard`).id = `dashboard${num_people}`;
    new_node.querySelector(`.tool-checkbox.dashboard ~ .tool`).setAttribute("for",`dashboard${num_people}`);
    //close-full-screen
    new_node.querySelector(`.tool-checkbox.close-full-screen`).id = `close-full-screen${num_people}`;
    new_node.querySelector(`.tool-checkbox.close-full-screen ~ .tool`).setAttribute("for",`close-full-screen${num_people}`);
    new_node.querySelector(".close-sign").style.display = (anchored_data.name==="你")?"none":"flex";
    people_on_screen.push(new_node.id);
    parent.appendChild(new_node);

    // console.log(people_on_screen);
    people_on_screen.forEach((item, index)=>{
        let switchModeNode = document.getElementById(item).cloneNode(true);
        switchModeNode.className="normal-person-block";
        switchModeNode.style="";
        document.getElementById(item).remove();
        parent.appendChild(switchModeNode);
    });
    let num_store_obj = 0;
    while(store_node.length!=0){
        let restore_node = store_node.shift();
        restore_node.className="normal-person-block";
        restore_node.style="";
        parent.appendChild(restore_node);
        people_on_screen.push(restore_node.id);
        num_store_obj ++;
    }

    if(more_num>1){
        
        total_people -= more_num;
        still_need = more_num;
        total_people+=num_store_obj;
        still_need-=num_store_obj;
        more_num = num_store_obj;
        for(let i = 0 ; i < still_need ; i++){
            add_people();
        }
        
    }
    re_display();
}
function anchored_person(id){

    let parent = focus_parent;
    let anchored_data = {
        name : document.getElementById(id).querySelector(".name").innerHTML,
        avatar_text :document.getElementById(id).querySelector(".avatar").innerHTML,
        avatar_color :document.getElementById(id).querySelector(".avatar").style.backgroundColor,
    }
    // console.log(id);
    document.getElementById(id).remove();
    people_on_screen = people_on_screen.filter((item)=>item!=id);
    document.getElementById("anchored-person").style.display = "grid";
    document.getElementById("thumbnail-container").style.display = "flex";
    document.getElementById("main").style.display ="grid";

    document.getElementById("anchored-person").querySelector(".name").innerHTML = anchored_data.name;
    document.getElementById("anchored-person").querySelector(".avatar").innerHTML = anchored_data.avatar_text;
    document.getElementById("anchored-person").querySelector(".avatar").style.backgroundColor = anchored_data.avatar_color;
    
    people_on_screen.forEach((item,index)=>{
        let temp_data = {
            name : document.getElementById(item).querySelector(".name").innerHTML,
            avatar_text :document.getElementById(item).querySelector(".avatar").innerHTML,
            avatar_color :document.getElementById(item).querySelector(".avatar").style.backgroundColor,
        }
        document.getElementById(item).remove();
        store_data.push(temp_data);
    });
    people_on_screen=[];
    let need_add_num=store_data.length;
    
    total_people -= need_add_num;
    more_num = -5;
    for(let i=0;i<need_add_num;i++){
        add_people();
        // setTimeout(()=>console.log(num_people,total_people,more_num,people_on_screen),10000000);
    }
    
    
    // console.log(num_people,total_people,more_num,people_on_screen); 
    return;
}
function change_data(id,data){
    document.getElementById(id).querySelector(".name").innerHTML = data.name;
    document.getElementById(id).querySelector(".avatar").innerHTML = data.avatar_text;
    document.getElementById(id).querySelector(".avatar").style.backgroundColor = data.avatar_color;
}

function handle_anchored(id){
    // console.log(screen_view,id);
    // console.log(document.getElementById(id));
    if(screen_view==="focus"){
        if(id==="anchored-person"){
            screen_view = "normal";
            unanchored();
            // console.log(people_on_screen);
            return;
        }
        switch_anchored(id);
        return;
    }
    else{
        if(id==="anchored-person"){
            re_display();
            return;
            
        }
        screen_view = "focus";
        anchored_person(id);
        re_display();
    }
    
    return;
}

for(let i=0;i<4;i++){
    add_people();
}

function setTime(){
    let time = new Date();
    let time_tag = "";
    let [hr,min] = [time.getHours(),time.getMinutes()];
    if(time.getHours()<6)time_tag="凌晨";
    else if(time.getHours()<12)time_tag="上午";
    else if(time.getHours()===12)time_tag="中午";
    else if(time.getHours()>12){
        time_tag="下午";
        hr -= 12;
    }
    else if(time.getHours()>=18){
        time_tag="晚上";
        hr -= 12;
    }
    let [hr_str,min_str] = [`${hr}`,`${min}`];
    document.getElementById("time-name").setAttribute("data-abbr",`${time_tag}${hr_str.padStart(2, "0")}:${min_str.padStart(2, "0")} | ···`);
    document.getElementById("time-name").querySelector("span").innerHTML = `${time_tag}${hr_str.padStart(2, "0")}:${min_str.padStart(2, "0")} | ylh-zsr-lqw`;
    // console.log("hi");
}
setTime();
setInterval(setTime,1000);