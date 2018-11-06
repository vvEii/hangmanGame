/* jshint esversion:6 */
var controller ={

  signUp: () => {

    let para = document.createElement("p");
    let node = document.createTextNode("Confirm Password");
    let input = document.createElement("input");
    let button = document.createElement("button");

    input.setAttribute("type","password");
    input.setAttribute("class","form-control");
    input.setAttribute("id","confirmPassword");
    input.setAttribute("placeholder","Confirm password");

    // let username = $("#usernameInput").val();
    // let password = $("#passwordInput").val();
    // let confirmPassword = $("confirmPassword").val();

    button.setAttribute("id","btn-submit");
    button.setAttribute("class","btn btn-success");
    //why is this not working ?
    //button.setAttribute("onclick","model.submit(username, password, confirmPassword)"");
    //button.onclick = model.submit(username,password,confirmPassword);
    button.setAttribute("onclick","model.submit()");
    button.textContent = "Submit";

    para.appendChild(node);
    $("#confirmPasswordDiv").append(para);
    $("#confirmPasswordDiv").append(input);
    $("#confirmPasswordDiv").append(button);
    $("#btn-login").hide();
    $("#btn-signUp").hide();
  },

  logOut: () => {
    window.history.go(-1);
    //location.replace("index.html");
  },

  back: () => {
    window.history.go(-1);
    //location.replace("game.html");
    //controller.startGame();
  },
  //start the game
  startGame: () => {
    model.init();
    controller.getInput();
    view.displayUser();
    view.displayNextBtn();
    view.displayRestartBtn();
    view.displayLogOutbtn();
    view.displayAplhabet();
    view.displayRankBtn();
  },

  //get user's input
  getInput: function(){
    $(function(){
      $(".letter").click(function(){
        inputLetter = this.textContent;
        document.getElementById(inputLetter).disabled = true;
        console.log(inputLetter);
        model.checkInput(inputLetter);
      });
    });
  },

  win: () => {
    $("#congratulation").text("Congratulation! You Win!!!");
  },

  lost: () => {
    $("#congratulation").text("Opps! You ran out of your chances and were failed! Please restart.");
    $("#btn-next").prop("disabled",true);
    //disable all alphabet buttons
    var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N",
      "O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    for (let i = 0; i < alphabet.length; ++i){
      let id = alphabet[i];
      $("#"+id).prop("disabled", true);
    }
  },

};
