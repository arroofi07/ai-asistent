// elements

const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const speakBtn = document.querySelector("#speak");

// speech recognition set up
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

// sr start
recognition.onstart = function () {
  console.log("vr active");
};

// sr result
// kofigurasi panggilan ai asisten
recognition.onresult = function (event) {
  let current = event.resultIndex;
  let transcript = event.results[current][0].transcript;
  transcript = transcript.toLowerCase();
  console.log(`my words : ${transcript}`);

  // kondisi 1
  const keyword1 = ["halo fa", "fa", "efa"];
  if (keyword1.some((newKeyword) => transcript.includes(newKeyword))) {
    readOut("hallo tuan");
  }

  //   kondisi ke 2
  const keyword2 = ["buka youtube", "youtube", "membukan youtube"];
  if (keyword2.some((newKeyword) => transcript.includes(newKeyword))) {
    readOut("baik tuan, youtube dibuka");
    window.open("https://www.youtube.com/watch?v=QLHpTVul3eQ");
  }

  //   kondisi ke 3
  //   memberikan perintah pencarian di google
  const keyword3 = [
    "cari tentang",
    "pencarian",
    "cari",
    "mencarikan",
    "mencari",
  ];
  if (keyword3.some((newKeyword) => transcript.includes(newKeyword))) {
    readOut("baik tuan, hasil ditampilkan");
    let input = transcript.split("");
    input.splice(0, 11);
    input.pop();
    input = input.join("").split(" ").join("+");
    window.open(`https://www.google.com/search?q=${input}`);
  }

  //   kondisi ke 4
  // membuka website kkn simabur
  const keyword4 = ["website kkn", "kkn simabur ubh"];
  if (keyword4.some((newKeyword) => transcript.includes(newKeyword))) {
    readOut("baik tuan, hasil ditampilkan");
    window.open(`https://kkn-simabur.vercel.app`);
  }

  // kondisi ke 5
  // deskripsi kecamatan pariangan
  //   kondisi ke 4
  // membuka website kkn simabur
  const keyword5 = [
    "kecamatan pariangan",
    "pariangan",
    "nagari simabur",
    "tanah",
    "datar",
  ];
  if (keyword5.some((newKeyword) => transcript.includes(newKeyword))) {
    let text =
      "Nagari Simabur adalah sebuah nagari di Kecamatan Pariangan, Kabupaten Tanah Datar, Sumatera Barat, yang terkenal dengan kekayaan budaya dan tradisi Minangkabau yang masih kental. Dikelilingi oleh pemandangan alam yang indah, seperti perbukitan hijau dan sawah yang luas, nagari ini menawarkan keindahan yang menyejukkan. Masyarakatnya yang ramah dan bersahabat masih memegang teguh adat istiadat leluhur, menjadikan Nagari Simabur sebagai pusat kehidupan tradisional Minangkabau. Dengan rumah-rumah gadang yang menjadi ciri khasnya, nagari ini juga merupakan destinasi wisata budaya yang menarik. Selain itu, ekonomi di Simabur sebagian besar ditopang oleh pertanian tradisional, menjaga keberlanjutan dan keseimbangan alam. Nagari Simabur dengan segala keunikannya merupakan contoh bagaimana budaya dan tradisi dapat terus hidup di tengah modernisasi.";
    readOut(text);
  }

  // Kondisi untuk menelpon nomor telepon
  const keyword6 = ["telepon", "panggil", "hubungi", "akbar"];
  if (keyword6.some((newKeyword) => transcript.includes(newKeyword))) {
    const phoneNumber = "089527923793"; // Nomor telepon harus mengikuti format internasional
    const message = "Halo, ini pesan dari asisten AI.";
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    readOut(`Baik tuan, membuka WhatsApp dan menghubungi nomor ${phoneNumber}`);
    window.open(waUrl); // Ini akan membuka WhatsApp dengan pesan yang telah diisi
  }
};

// sr stop
recognition.onend = function () {
  console.log("vr deactive");
};

//
// sr continuos
// recognition.continuous = true;
//
//

startBtn.addEventListener("click", () => {
  recognition.start();
});

// sr start
stopBtn.addEventListener("click", () => {
  recognition.stop();
});

// ava speech
function readOut(message) {
  const synth = window.speechSynthesis;
  const sentences = message.match(/[^\.!\?]+[\.!\?]+/g) || [message];

  sentences.forEach((sentence) => {
    const utterThis = new SpeechSynthesisUtterance(sentence);
    utterThis.voice = synth.getVoices()[8];
    utterThis.volume = 1;
    synth.speak(utterThis);
  });
  console.log("speaking out");
}
// function readOut(message) {
//   const speech = new SpeechSynthesisUtterance();
//   //diffrent voices
//   const allVoices = speechSynthesis.getVoices();

//   speech.text = message;
//   speech.voice = allVoices[8];
//   speech.volume = 1;
//   window.speechSynthesis.speak(speech);
//   console.log("speaking out");
// }

// example
speakBtn.addEventListener("click", () => {
  readOut("halo ini eva, adakah yang bisa saya bantu tuan!");
});

window.onload = function () {
  readOut(" ");
};
