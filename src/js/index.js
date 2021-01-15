import '../scss/styles.scss';
import PingImage from '../img/coffee.png';
import Notes from '../assets/components/my-components/data.csv';
import Contact from '../assets/components/my-components/data.json';
import Data from '../assets/components/my-components/data.xml';

console.log(Data);
console.log(Notes);
console.log(Contact);

// Testing ES6 syntax
const tool = ' Works';
console.log(`It ${tool}...`);

function component() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');

  const div = document.createElement('div');
  wrapper.appendChild(div);

  const h1 = document.createElement('h1');
  h1.innerHTML = 'Great Job!';
  div.appendChild(h1);

  const h2 = document.createElement('h2');
  h2.innerHTML = 'Now, its Time for Coffee.';
  div.appendChild(h2);

  // Create an Image tag.
  document.createElement('img');
  const myImage = new Image();
  myImage.src = PingImage;
  div.appendChild(myImage);

  const p = document.createElement('p');
  div.appendChild(p);

  // Add button to existing div.
  const btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = function () {
    console.log('Coffee Break is Over!');
  };
  p.appendChild(btn);

  wrapper.appendChild(div);

  return wrapper;
}
document.body.appendChild(component());

