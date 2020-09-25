img= "";
objects = [];
status = "";

function preload() {
  img = loadImage("dog_cat.jpg");
}
function setup() {
   canvas = createCanvas(380 , 380);
   canvas.center();

   video = createCapture(VIDEO);
   video.hide();
   video.size(380 , 380);

   objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
   document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function draw() {
   image(video , 0 , 0 , 380 , 380);

   if (status != "") {
      objectDetector.detect(video , gotResult);
      for ( i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status = Objects Detected";
          document.getElementById("number_of_objects").innerHTML = "Number of objects detected : "+objects.length;
         
          r = random(255) ;
          g = random(255) ;
          b = random(255) ;

          percent = floor(objects[i].confidence*100);
          fill(r , g, b);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15 , objects[i].y + 15);
          noFill();
          stroke(r , g , b);
          rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
      }
   }
}

function modelLoaded() {
    console.log("model is loaded");
    status = true;
}

function gotResult(error , results) {
   if(error) {
      console.log(error);
   } else {
      console.log(results);
      objects = results;
   }
}