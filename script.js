const opArr = [(num1, num2) => num1+num2, (num1, num2) => num1-num2, (num1, num2) => num1*num2, (num1, num2) => num1/num2];
const signArr = ['+', '-', 'x', '/'];

// SCENARIO 1 : [(A_B)_C]_D 
const iteSignNoBrkt = (a, b, c, d) => {
  for (let i=0; i<opArr.length; i+=1) {
    const sum1 = opArr[i](a, b);
    for (let j=0; j < opArr.length; j+=1) {
      const sum2 = opArr[j](sum1, c);
      for (let k=0; k<opArr.length; k+=1) {
        const sum3 = opArr[k](sum2, d);
        console.log(sum3);
        if (sum3 === 24) {
          return `[(${a}${signArr[i]}${b})${signArr[j]}${c}]${signArr[k]}${d}`;
        }
      }
    }
  }
};

// SCENARIO 2 : (A_B)_(C_D)
const iteSignBrkt = (a, b, c, d) => {
  for (let i=0; i<opArr.length; i+=1) {
    const sum1 = opArr[i](a, b);
    for (let j=0; j < opArr.length; j+=1) {
      const sum2 = opArr[j](c, d);
      for (let k=0; k<opArr.length; k+=1) {
        const sum3 = opArr[k](sum1, sum2);
        console.log(sum3);
        if (sum3 === 24) {
          return `(${a}${signArr[i]}${b})${signArr[k]}(${c}${signArr[j]}${d})`;
        }
      }
    }
  }
};

const formatAJQK = (num) => {
  if (num === 'A' || num === 'a') {
    return 1;
  }
  if (num === 'J' || num === 'j') {
    return 10;
  }
  if (num === 'Q' || num === 'q') {
    return 10;
  }
  if (num === 'K' || num === 'k') {
    return 10;
  }
  return num;
}

const startCalc = () => {

  const input = document.querySelector('#input').value;
  if (input === "") {
    document.querySelector('#answer').innerText = 'Please type in your digits!';
    return;
  }
  const inputArr = input.split(' ');
  if (inputArr.length < 4) {
    document.querySelector('#answer').innerText = 'Please type in 4 digits!';
    return;
  }
  [p, q, r, s] = inputArr.map((numStr) => Number(formatAJQK(numStr)));

  var permArr = [p, q, r, s].reduce(function permute(res, item, key, arr) {
      return res.concat(arr.length > 1 && arr.slice(0, key)
          .concat(arr.slice(key + 1))
          .reduce(permute, [])
          .map(function (perm) {
              return [item].concat(perm);
          }) || item);
  }, []);

  let ans = '';
  for (let i=0; i<permArr.length; i+=1) {
    ans = iteSignNoBrkt(permArr[i][0], permArr[i][1], permArr[i][2], permArr[i][3]);
    if (ans) {
      console.log(ans);
      document.querySelector('#answer').innerText = ans;
      return;
    }
    ans = iteSignBrkt(permArr[i][0], permArr[i][1], permArr[i][2], permArr[i][3]);
    if (ans) {
      console.log(ans);
      document.querySelector('#answer').innerText = ans;
      return;
    }
    document.querySelector('#answer').innerText = 'No Answer';
    console.log('No Answer');
  }
  document.querySelector('#answer').innerText = ans;
};

const init = () => {
  document.querySelector('#submit').addEventListener("click", startCalc);
};

init();