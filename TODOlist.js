"use strict"

let no = 0;
//console.log(no);
const text = "text";
let text_lenght = text.length;

const button_img = "button_img";
const button_name = "button_name";
const count = "count";

const button = "button";
let  button_lenght = button.length;

if (localStorage.getItem(count) == undefined) {
  localStorage.setItem(count,0); no = 0;
} else { no = localStorage.getItem(count);}

function count_no() {

  let num = localStorage.getItem(count) ;
  ++num; no = num;
  localStorage.setItem(count, num);   
}

function create(name, value){
  let id_text = text + no;
  let load_value = "";
  let id_value = "";
  let id_no = no;
  let state_value = 0;
  let order = 0;
 // console.log(no);

  if(name != null){
    id_value = true;
  }
  if (id_value == true) {
    id_text = name;
    load_value = value.slice(1);
    id_no = Number(name.slice(text_lenght));
    state_value = Number(value.slice(0, 1));
    //console.log(state_value);
    //console.log(id_no);
  }
   //<div class="">

  let text_field = [
      '<div class = "textfield">',
        '<textarea class="text" name="text" wrap="hard" id="'+id_text+'" maxlength="70">'+load_value+'</textarea>',
      '</div>',
  ].join('\n');

  let delete_button = [
      '<botton class="close" type="button" onclick="task.remove.one('+id_no+')">',
        '<p>Delete</p>',
      '</botton>',
  ].join('\n');

  let check = [
      '<button type="button" id= "'+button+id_no+'" name="check" onclick="check_button('+id_no+')" class="c1" state="'+state_value+'">',
        '<img class = "check_img" id="'+button_img+id_no+'" src = "https://www.nicepng.com/png/detail/170-1703148_red-sign-icon-mark-symbol-cross-marks-orange.png"></img>',
        '<div class = "check" id="'+button_name+id_no+'">Unchecked</div>', 
      '</button>',
  ].join('\n');

  let save_button = [
    '<button class="save" id="save'+id_no+'" type="button" onclick="task.save('+id_no+","+state_value+')">',
      '<p>Save</p>',
    '</button>',
  ].join('\n');
  //</div>

  let img_skret1 = [
    '<img class = "skret1"  id = "button_sk'+id_no+'" src = "https://i.pinimg.com/originals/71/68/d0/7168d0bb50904d02d9f6017682918a9f.jpg">',
    '</img>',
  ].join('\n');

  const tasklist = document.getElementById("tasklist");
  const tag = document.createElement("task");
    tag.innerHTML = text_field + delete_button + check + save_button + img_skret1;  
  const id = document.createAttribute("id");
    id.value = id_no;
    tag.setAttributeNode(id);
  const css = document.createAttribute("class");
    css.value = "task";
    tag.setAttributeNode(css);
  tasklist.insertBefore(tag, tasklist.childNodes[order]);  

  if(id_value == true) {
    check_button(id_no, state_value);
  } else { count_no();}
}

function check_button(id_no, state){

  let tocheck = document.getElementById(button_name+id_no);
  let tochange_img = document.getElementById("button_sk"+id_no);
  let tocheck_img = document.getElementById(button_img+id_no);
  let button = document.getElementById("button"+id_no);
  let get_state = button.getAttribute("state");
  //console.log(get_state);
  let save = document.getElementById("save"+id_no);
  
  if(state != null){
    switch (state) {
      case 1:
        get_state = "0"; break;
      case 0:
        get_state = "1"; break;  
    }
  }
 
  switch (get_state) {
    case "0":
      tocheck.innerHTML = "Checked";
      tocheck_img.setAttribute("src","https://cutewallpaper.org/21/checkmark/Green-checkmark-icon-Free-green-check-mark-icons.png");
      tochange_img.setAttribute("class","skret2");
      tochange_img.setAttribute("src","https://i.pinimg.com/originals/99/df/7c/99df7c422027d2e7836c06ca30487c84.png");
      button.setAttribute("state",1);
      save.setAttribute("onclick","task.save("+id_no+","+1+")");
      break;
    
    case "1":
      tocheck.innerHTML = "Unchecked";
      tocheck_img.setAttribute("src","https://www.nicepng.com/png/detail/170-1703148_red-sign-icon-mark-symbol-cross-marks-orange.png");
      tochange_img.setAttribute("class","skret1");
      tochange_img.setAttribute("src","https://i.pinimg.com/originals/71/68/d0/7168d0bb50904d02d9f6017682918a9f.jpg" );
      button.setAttribute("state",0);
      save.setAttribute("onclick","task.save("+id_no+","+0+")");
      break;
  } 
}

const task = {
  id:"",
  button:"",
  pop_state:0,

  async save(id_no, b_state) {
    let task_text = document.getElementById(task.id+id_no).value;
    localStorage.setItem( task.id+ id_no, b_state + " "+ task_text);
  },
  async load() {
    for(let i=0; i<localStorage.length; i++) {
      let name = localStorage.key(i);
      if(name.slice(0,text_lenght) == text) {
        let value = localStorage.getItem(name);
        create(name, value);
      }
    }
  },
  async filter(value) {
    let tag = document.getElementsByTagName("task");
    let bck = document.getElementsByClassName("c1");
    let bck_state = "";
    for(let i=0; i<tag.length; i++) {
      switch (value) {
        case 0:
          bck_state = bck[i].getAttribute("state");
          if (bck_state == value) {
            tag[i].style.display = "none";
          }
          break;
        case 1:
          bck_state = bck[i].getAttribute("state");

          if (bck_state == value) {
            tag[i].style.display = "none";
          }
          break;
        default:
          tag[i].style.display = "block";  
      }
    }
  },

  async show_field() {
    let pp1 = document.getElementById("show_filter");
    switch (task.pop_state) {
      case 0:
        pp1.style.visibility = "visible";
        task.pop_state = 1;
        break;

      case 1:
        pp1.style.visibility = "hidden";
        task.pop_state = 0;
        break;
    }
  },
  remove: {
    async one(id_no) {
      let w_text = "You are deleting a task!";
      if( confirm(w_text) == true) {
        let toremove = document.getElementById(id_no);
        toremove.remove(); 
        localStorage.removeItem(text+id_no);
      }
    },
    async all() {
      let collect = document.getElementsByTagName("task");
      let w_text = "You are about to delet all task !!!";
      let toremove = [];

      for (let i = 0; i<collect.length; i++) {
        toremove.push(collect[i]);
      }
      if( confirm(w_text) == true) {
        localStorage.clear();
        for(let i=0; i<toremove.length; i++){
          toremove[i].remove();
        } 
      }
    },
  }, 
};
task.id = text; task.button = button;
task.load();




