const time = document.querySelector(".time");
const days = document.querySelector(".days");
const surahSelect = document.querySelector("#surah__select");
const ayahSelect = document.querySelector("#ayah__select");
const audio = document.querySelector("audio");
const text = document.querySelector("#text");
const nameSelect = document.querySelector("#name__select");

const API_URL = "https://api.alquran.cloud/v1";

(async () => {
  const response = await fetch(`${API_URL}/edition/format/audio`);
  const { data } = await response.json();
  data?.forEach((name) => {
    const option = document.createElement("option");
    option.value = name.identifier;
    option.textContent = name.englishName;
    nameSelect.appendChild(option);
  });
})();

nameSelect.addEventListener("change", (e) => {
  surahSelect.innerHTML = "<option selected disabled>Surani tanlash</option>";
  (async () => {
    const response = await fetch(`${API_URL}/quran/${e.target.value}`);
    const {
      data: { surahs },
    } = await response.json();
    let selectedSurahIdx = 0;
    surahs?.forEach((sura) => {
      const { englishName, number } = sura;
      const option = document.createElement("option");
      option.value = number - 1;
      option.textContent = `${number}.${englishName}`;
      surahSelect.appendChild(option);
    });

    surahSelect.addEventListener("change", (e) => {
      const { value } = e.target;
      selectedSurahIdx = value;
      ayahSelect.innerHTML =
        " <option selected disabled>Oyatni tanlash</option>";
      surahs[value]?.ayahs.forEach((_, idx) => {
        const option = document.createElement("option");
        option.value = idx;
        option.textContent = `${idx + 1}`;
        ayahSelect.appendChild(option);
      });
    });

    ayahSelect.addEventListener("change", (e) => {
      const { value } = e.target;
      const selectedAyah = surahs[selectedSurahIdx]?.ayahs?.[value];
      audio.src = selectedAyah.audio;
      text.textContent = selectedAyah.text;
    });
  })();
});

function hozirgiKun() {
  var date = new Date();
  var yil = date.getFullYear();
  var oy = date.getMonth() + 1;
  var kun = date.getDate();

  days.innerHTML =
    "Sana: " +
    (kun < 10 ? "0" + kun : kun) +
    ":" +
    (oy < 10 ? "0" + oy : oy) +
    ":" +
    (yil < 10 ? "0" + yil : yil) +
    "y";
}
hozirgiKun();

function hozirgiVaqtniOlish() {
  var hozirgiVaqtniOlish = new Date();
  var soat = hozirgiVaqtniOlish.getHours();
  var daqiqa = hozirgiVaqtniOlish.getMinutes();
  var saniya = hozirgiVaqtniOlish.getSeconds();
  var oshibBorayotganSaniyalar = soat * 3600 + daqiqa * 60 + saniya;

  time.innerHTML =
    " Vaqt: " +
    (soat < 10 ? "0" + soat : soat) +
    ":" +
    (daqiqa < 10 ? "0" + daqiqa : daqiqa) +
    ":" +
    (saniya < 10 ? "0" + saniya : saniya);
}
hozirgiVaqtniOlish();
setInterval(function () {
  hozirgiVaqtniOlish();
}, 1000);
