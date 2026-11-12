const pages = ["home","start","motion","excitation","field","protection","sart","brake","faults"];
function showPage(name){
  pages.forEach(p=>{
    document.getElementById(`page-${p}`).classList.toggle("active",p===name);
  });
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===name));
  window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll("[data-page]").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.page)));
document.querySelectorAll("[data-goto]").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.goto)));

const faultInfo = {
  ground: {
    title:"Сработало реле заземления РЗ",
    facts:"В пособии описано срабатывание рабочей катушки РЗ при разности потенциалов 80–100 В. Контакты РЗ разрывают цепь питания КВ и РКВ, снимая нагрузку с тягового генератора.",
    question:"Какой защитный аппарат сработал и какие цепи он отключает?",
    answer:"Проверь описание цепи контроля изоляции, рабочую и удерживающую катушки РЗ, а также цепь КВ/РКВ. В учебной диагностике не выполняй реальные переключения на локомотиве."
  },
  overheat: {
    title:"Перегрев воды или масла дизеля",
    facts:"По пособию при температуре воды 90 °C срабатывает РТ3, а при температуре масла 75 °C — РТ6. Отключается контактор возбуждения генератора.",
    question:"Какое термореле соответствует каждому температурному порогу?",
    answer:"Вода 90 °C — SK1.2 (РТ3). Масло 75 °C — SK3 (РТ6). Далее изучается разрыв цепи КВ."
  },
  slip: {
    title:"Возникло боксование",
    facts:"Сигнал разбаланса поступает через измерительные преобразователи ДБ1/ДБ2 в УСТА. Система снижает мощность тягового генератора, а после прекращения боксования плавно её увеличивает.",
    question:"Через какие преобразователи сигнал поступает в УСТА?",
    answer:"ДБ1 и ДБ2. В пособии также указаны программные пороги РБ1 — 8,8 В, РБ2 — 17,6 В и РБ3 — 26,3 В."
  },
  field: {
    title:"Не включается первая ступень ослабления поля",
    facts:"В описании цепь Ш1 включает реле РУ40 и РВ6. Среди условий — включённое управление переходами, разрешающие блокировки и команда УСТА.",
    question:"Какие два реле участвуют в цепи включения Ш1?",
    answer:"РУ40 и РВ6. Следующий этап полноценного тренажёра — пошаговая проверка разрешающих контактов, проводов и катушки вентиля Ш1 по схеме."
  }
};
document.getElementById("show-fault").addEventListener("click",()=>{
  const item=faultInfo[document.getElementById("fault-select").value];
  document.getElementById("fault-task").innerHTML=`<strong>${item.title}</strong><p>${item.facts}</p><p><b>Вопрос:</b> ${item.question}</p><details><summary>Показать учебный разбор</summary><p>${item.answer}</p></details>`;
});
if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}));}
const connection=document.getElementById("connection");
function updateConnection(){connection.textContent=navigator.onLine?"● Приложение готово":"● Автономный режим";connection.style.color=navigator.onLine?"#43d6a0":"#f1b65b";}
window.addEventListener("online",updateConnection);window.addEventListener("offline",updateConnection);updateConnection();