import { useState, useEffect, useRef } from "react";

const T={bg:"#070707",s1:"#0f0f0f",s2:"#161616",s3:"#1d1d1d",br:"#222",br2:"#2c2c2c",acc:"#c9f13a",accDk:"#162300",accMd:"#324f00",txt:"#f0f0f0",sub:"#6a6a6a",dim:"#2a2a2a",bl:"#5ca4f8",blDk:"#0b1e3e",or:"#fb923c",orDk:"#281000",rd:"#f87171"};

const GIFS={goblet:"https://www.inspireusafoundation.org/wp-content/uploads/2022/08/goblet-squat.gif",stiff:"https://www.inspireusafoundation.org/wp-content/uploads/2022/01/romanian-deadlift.gif","leg press":"https://www.inspireusafoundation.org/wp-content/uploads/2022/03/leg-press.gif",extensora:"https://www.inspireusafoundation.org/wp-content/uploads/2022/03/leg-extension.gif","panturrilha em p":"https://www.inspireusafoundation.org/wp-content/uploads/2022/03/standing-calf-raise.gif","panturrilha sentada":"https://www.inspireusafoundation.org/wp-content/uploads/2022/04/seated-calf-raise.gif",supino:"https://www.inspireusafoundation.org/wp-content/uploads/2022/03/dumbbell-bench-press.gif",remada:"https://www.inspireusafoundation.org/wp-content/uploads/2022/04/seated-cable-row.gif",desenvolvimento:"https://www.inspireusafoundation.org/wp-content/uploads/2022/04/seated-dumbbell-shoulder-press.gif",puxada:"https://www.inspireusafoundation.org/wp-content/uploads/2022/03/lat-pulldown.gif",rosca:"https://www.inspireusafoundation.org/wp-content/uploads/2022/03/barbell-curl.gif",triceps:"https://www.inspireusafoundation.org/wp-content/uploads/2022/03/tricep-pushdown.gif",prancha:"https://www.inspireusafoundation.org/wp-content/uploads/2022/03/plank.gif","dead bug":"https://www.inspireusafoundation.org/wp-content/uploads/2022/09/dead-bug.gif",pallof:"https://www.inspireusafoundation.org/wp-content/uploads/2022/08/pallof-press.gif","mesa flexora":"https://www.inspireusafoundation.org/wp-content/uploads/2022/03/lying-leg-curl.gif",afundo:"https://www.inspireusafoundation.org/wp-content/uploads/2022/03/lunge.gif",agachamento:"https://www.inspireusafoundation.org/wp-content/uploads/2022/01/barbell-squat.gif"};
function getGif(n){const l=n.toLowerCase();for(const[k,u]of Object.entries(GIFS))if(l.includes(k))return u;return null;}

const TIPS={
  "goblet|agachamento":["Peito alto durante todo o movimento — se o tronco cair, o core perdeu tensão","Joelhos seguem os dedos dos pés, nunca colapsam para dentro","Excêntrico 2-3s (descida lenta) + concêntrico explosivo — esse contraste cria força","Respira fundo antes de descer (Valsalva), expira ao subir pelo ponto mais difícil"],
  stiff:["Movimento começa empurrando o quadril pra trás — não dobrando a coluna","Sinta o estirramento nos isquiotibiais: se não sentir, a carga está baixa","Barra ou halteres colados nas pernas durante todo o movimento","Leve flexão nos joelhos o tempo todo — nunca trave"],
  "leg press":["Pés altos = mais glúteo e posterior. Pés baixos = mais quadríceps","Não trave os joelhos no topo — retira tensão e sobrecarrega a articulação","Desça até 90° ou ligeiramente abaixo — amplitude completa","Costas coladas no encosto sempre, sem saírem no esforço"],
  "extensora|cadeira":["Aperte o quadríceps com força no topo, pausa de 1 segundo antes de descer","Excêntrico de 2-3s — a descida controlada é mais importante que a subida","Se precisar de impulso para subir, a carga está acima do necessário","Unilateral revela desequilíbrios — nota diferença entre os lados?"],
  panturrilha:["Amplitude completa: calcanhar abaixo da plataforma na descida","Pausa de 1s no topo com contração máxima antes de descer","Fibra resistente — precisa de volume alto e execução lenta para responder","Calcanhares juntos = gastrocnêmio lateral; afastados = sóleo"],
  supino:["Escápulas retraídas e deprimidas — 'coloca no bolso de trás' antes de tocar na barra","Cotovelos a 45° do tronco — jamais 90° que sobrecarrega o ombro","Arco lombar natural, bumbum no banco o tempo todo — não tira para forçar","Pés pressionados no chão criam base estável e transferem força"],
  remada:["Puxe com o cotovelo — 'enfie o cotovelo no bolso de trás'","Aperte a escápula no final — é esse movimento que desenvolve o dorsal","Tronco estável, sem balanço para usar impulso corporal","Pausa de 1s no ponto mais contraído antes de soltar"],
  "desenvolvimento|shoulder press":["Não trava o cotovelo no topo — mantém tensão contínua no deltóide","Cabeça neutra — não projete o queixo para frente ao pressionar","Core ativado — não arqueie a lombar para compensar fraqueza de ombro","Dor no ombro? Reduza amplitude ou ajuste o ângulo dos cotovelos"],
  puxada:["Peito para cima, puxe até o esterno — não até o queixo","'Enfie os cotovelos nos bolsos' para ativar o dorsal, não o bíceps","Controle a subida em 2-3s — não sobe rápido como um elástico","Leve inclinação do tronco para trás (5-10°) é normal e saudável"],
  rosca:["Cotovelo fixo no tronco — o ombro não avança pra compensar","Supinação completa no topo (palma vira para cima) = contração máxima do bíceps","Excêntrico controlado — crucial para hipertrofia real","Balançou o tronco? A carga está acima do necessário — reduza"],
  triceps:["Cotovelo colado ao lado do corpo durante todo o movimento","Abre a corda no final — essa pronação ativa a cabeça lateral do tríceps","Não inclina o tronco para frente — isola muito melhor na vertical","Aperte o tríceps no ponto mais estendido antes de voltar"],
  prancha:["Corpo em linha reta — nem o quadril subindo, nem caindo","Core como se fosse levar um soco no abdômen — contrai assim","Empurre o chão com os cotovelos para ativar os serráteis","Respira normalmente — prender a respiração não ajuda e aumenta pressão"],
  "dead bug":["Lombar COLADA no chão — é o único critério de sucesso do exercício","Estenda braço e perna opostos simultaneamente, devagar e controlado","Se a lombar sair do chão, reduza a amplitude da perna, não desista","Exercício de estabilidade anti-extensão — simples e extremamente eficaz"],
  pallof:["Braços totalmente estendidos à frente, segura 2s antes de voltar","O trabalho do core é RESISTIR à rotação — não é exercício de rotação","Quanto mais longe do cabo, maior a dificuldade para o core","Joelhos levemente flexionados, respiração normal durante todo"],
  "afundo|lunge":["Joelho de trás quase toca o chão — amplitude completa ativa o glúteo","Tronco vertical — inclinação à frente indica fraqueza de quadril","Joelho da perna da frente não vai além da ponta do pé","Nota desequilíbrio entre lados? Isso é normal, registra e acompanha"],
  "mesa flexora|leg curl":["Aperte o posterior da coxa no topo, pausa de 1s antes de descer","Excêntrico de 2-3s — a descida é mais importante que a subida","Pés em leve flexão plantar (bico para baixo) potencializa o bíceps femoral","Usou a lombar para ajudar na subida? A carga está acima do necessário"],
};
function getTips(n){const l=n.toLowerCase();for(const[k,t]of Object.entries(TIPS))if(k.split("|").some(kk=>l.includes(kk)))return t;return["Execução limpa sempre antes de aumentar a carga","Respire de forma controlada — não prenda durante o esforço"];}

const beep=()=>{try{const c=new(window.AudioContext||window.webkitAudioContext)();[0,.28,.56].forEach((t,i)=>{const o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.type="sine";o.frequency.value=780+i*120;g.gain.setValueAtTime(0,c.currentTime+t);g.gain.linearRampToValueAtTime(.5,c.currentTime+t+.06);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+t+.45);o.start(c.currentTime+t);o.stop(c.currentTime+t+.45);});}catch{}};

const sg=async k=>{try{const r=await window.storage.get(k);return r?.value?JSON.parse(r.value):null;}catch{return null;}};
const sw=async(k,v)=>{try{await window.storage.set(k,JSON.stringify(v));}catch{}};

function dayProg(day,st,di){
  const p=Array.isArray(day.bloco?.principal)?day.bloco.principal:[];
  const c=Array.isArray(day.bloco?.core)?day.bloco.core:[];
  let tot=0,done=0;
  [...p,...c].filter(e=>e.series).forEach(ex=>{const k=ex.ordem||ex.exercicio;tot+=ex.series;for(let i=0;i<ex.series;i++)if(st[`${di}_${k}_${i}`])done++;});
  return{done,tot};
}

const SAMPLE={fase_atual:"Build",semanas_para_maratona:8,tipo_de_semana:"Reentrada (1 de 2)",treino_chave:"Longo sábado 12km Z2",dias:[{dia:"Quarta",data_referencia:"27/05",tipo:"Força inferior leve",duracao_min:50,bloco:{aquecimento:{duracao_min:8,atividades:["3 min bike/esteira leve","World's greatest stretch 5x cada lado","Agachamento profundo segurado 3x20s","Ativação glúteo mini band 2x15"]},principal:[{ordem:"A",exercicio:"Agachamento goblet com haltere",series:3,reps:10,rpe:6,descanso_s:90,cue:"Peito alto, joelho seguindo o pé"},{ordem:"B",exercicio:"Stiff com halteres",series:3,reps:10,rpe:6,descanso_s:90,cue:"Empurra o quadril pra trás, costas neutras"},{ordem:"C",exercicio:"Leg press 45 graus",series:3,reps:12,rpe:6,descanso_s:90,cue:"Pés altos no apoio, não trava o joelho"},{ordem:"D",exercicio:"Cadeira extensora unilateral",series:2,reps:12,rpe:7,descanso_s:60,cue:"Aperta quadríceps em cima, controla a descida"},{ordem:"E",exercicio:"Panturrilha em pé na máquina",series:2,reps:15,rpe:7,descanso_s:45,cue:"Amplitude completa, pausa 1s em cima"}],desaquecimento:{duracao_min:7,atividades:["Isquio em pé 2x30s cada","Pombo sentado 2x30s cada","Rolo panturrilha 60s cada"]}},atencao:"Dor articular em joelho ou lombar = encerra e troca por máquina"},{dia:"Quinta",data_referencia:"28/05",tipo:"Corrida Z2 fácil",duracao_min:35,sauna_almoco:true,bloco:{aquecimento:{duracao_min:5,atividades:["Caminhada aquecimento"]},principal:{tipo:"Corrida contínua Z2",duracao_min:27,pace_alvo:"6:40-7:10/km",bpm_alvo:"114-133",criterio_ajuste:"Se BPM passar de 140, reduz o pace"},desaquecimento:{duracao_min:3,atividades:["Caminhada"]}},atencao:"Primeira corrida pós pausa — não olha pro pace antigo"},{dia:"Sexta",data_referencia:"29/05",tipo:"Força superior + core",duracao_min:50,bloco:{aquecimento:{duracao_min:8,atividades:["3 min bike/esteira","Cat-cow 2x10","Rotação torácica 2x8 cada","Band pull apart 2x15"]},principal:[{ordem:"A",exercicio:"Supino com halteres",series:3,reps:10,rpe:7,descanso_s:90,cue:"Escápulas presas no banco, cotovelos 45°"},{ordem:"B",exercicio:"Remada baixa no cabo",series:3,reps:10,rpe:7,descanso_s:90,cue:"Puxa com cotovelo, aperta escápula no fim"},{ordem:"C",exercicio:"Desenvolvimento com halteres sentado",series:3,reps:10,rpe:7,descanso_s:90,cue:"Não trava o cotovelo, cabeça neutra"},{ordem:"D",exercicio:"Puxada frente máquina",series:3,reps:10,rpe:7,descanso_s:90,cue:"Peito pra cima, puxa até o esterno"},{ordem:"E",exercicio:"Rosca direta com halteres",series:2,reps:12,rpe:7,descanso_s:60,cue:"Cotovelo fixo no tronco"},{ordem:"F",exercicio:"Triceps corda no cabo",series:2,reps:12,rpe:7,descanso_s:60,cue:"Cotovelo colado, abre a corda no fim"}],core:[{exercicio:"Prancha frontal",series:3,duracao_s:40,descanso_s:30},{exercicio:"Dead bug",series:3,reps_cada_lado:8,descanso_s:30},{exercicio:"Pallof press no cabo",series:2,reps_cada_lado:10,descanso_s:30}],desaquecimento:{duracao_min:5,atividades:["Peitoral na parede","Dorsal","Mobilidade ombro"]}},atencao:"Nada de perna hoje — amanhã tem longo"},{dia:"Sábado",data_referencia:"30/05",tipo:"Longo — reentrada",duracao_min:80,bloco:{aquecimento:{duracao_min:8,atividades:["3 min caminhada","5 min Z1 trote suave"]},principal:{tipo:"Corrida contínua Z2",distancia_km:12,pace_alvo:"6:40-7:00/km",bpm_alvo:"114-133",criterio_ajuste:"BPM acima de 140 = reduz pace até voltar à zona"},desaquecimento:{duracao_min:5,atividades:["Caminhada"]}},nutricao:"Café + banana ou pão com mel 45min antes. Água com sal se >75min",atencao:"Primeiro longo pós pausa. Pace não importa hoje — BPM importa"},{dia:"Domingo",data_referencia:"31/05",tipo:"OFF",duracao_min:0,opcional:"Sauna 10min + caminhada 20min em ritmo de conversa"},{dia:"Segunda",data_referencia:"01/06",tipo:"Corrida Z2",duracao_min:40,bloco:{aquecimento:{duracao_min:5,atividades:["Caminhada + ativação"]},principal:{tipo:"Corrida contínua Z2",duracao_min:30,pace_alvo:"6:30-7:00/km",bpm_alvo:"114-133",criterio_ajuste:"BPM acima de 140 = reduz pace"},desaquecimento:{duracao_min:5,atividades:["Caminhada"]}}},{dia:"Terça",data_referencia:"02/06",tipo:"Força inferior",duracao_min:50,sauna_almoco:true,bloco:{aquecimento:{duracao_min:8,atividades:["3 min bike","Mobilidade quadril e tornozelo","Ativação glúteo"]},principal:[{ordem:"A",exercicio:"Agachamento goblet ou barra",series:3,reps:8,rpe:7,descanso_s:120,cue:"Profundidade: quadril abaixo do joelho"},{ordem:"B",exercicio:"Stiff com barra ou halteres",series:3,reps:8,rpe:7,descanso_s:120,cue:"Quadril vai pra trás, peso no calcanhar"},{ordem:"C",exercicio:"Afundo no smith ou halteres",series:3,reps_cada_perna:10,rpe:7,descanso_s:90,cue:"Joelho de trás pinga, tronco vertical"},{ordem:"D",exercicio:"Mesa flexora",series:3,reps:12,rpe:7,descanso_s:60,cue:"Aperta posterior no fim, controla a volta"},{ordem:"E",exercicio:"Panturrilha sentada",series:2,reps:15,rpe:7,descanso_s:45,cue:"Pausa 1s em cima"}],desaquecimento:{duracao_min:7,atividades:["Isquio","Pombo sentado","Panturrilha no rolo"]}},atencao:"DOMS da quarta ainda presente? Mantém RPE 6"}]};

const NUTRI={objetivo:"Déficit moderado — perda de gordura mantendo performance",calorias:2400,proteina_g:180,carbo_g:260,gordura_g:70,refeicoes:[{nome:"Café da manhã",horario:"06:45",kcal:520,proteina:28,itens:["3 ovos mexidos","2 fatias pão integral","1 banana","Café sem açúcar"]},{nome:"Almoço",horario:"12:30",kcal:680,proteina:52,itens:["150g frango grelhado","120g arroz integral (cru)","Salada verde à vontade","1 col sopa azeite"]},{nome:"Pré-treino (se tarde)",horario:"16:00",kcal:220,proteina:6,itens:["1 banana","30g aveia","Café ou cafeína 200mg"]},{nome:"Shake + Janta",horario:"19:30",kcal:620,proteina:58,itens:["1 scoop whey (30g prot)","150g batata doce","100g legumes refogados","100g carne ou peixe"]}],hidratacao:"3 a 3.5L/dia. Adiciona 500ml por hora de treino",suplementos:["Whey pós-treino","Creatina 5g/dia (qualquer hora)","Cafeína 200mg pré-treino (opcional)"],nota:"Longo sábado: café + banana ou pão com mel 45min antes. Água com sal se ultrapassar 75min correndo."};

export default function App(){
  const[tab,setTab]=useState("semana");
  const[data,setData]=useState(SAMPLE);
  const[nutri,setNutri]=useState(NUTRI);
  const[dayIdx,setDayIdx]=useState(null);
  const[st,setSt]=useState({});
  const[loads,setLoads]=useState({});
  const[gRest,setGRest]=useState(90);
  const[rt,setRt]=useState(0);
  const[rTot,setRTot]=useState(0);
  const[rOn,setROn]=useState(false);
  const[expEx,setExpEx]=useState(null);
  const[showJson,setShowJson]=useState(false);
  const[chat,setChat]=useState([{role:"assistant",content:"Oi Lucas! Sou seu coach — personal trainer e nutricionista em um só. Fala sobre treino, ajuste de cargas, alimentação ou peça um novo treino em JSON."}]);
  const[chatIn,setChatIn]=useState("");
  const[chatLd,setChatLd]=useState(false);
  const[jsonIn,setJsonIn]=useState("");
  const[jsonErr,setJsonErr]=useState("");
  const iv=useRef(null);
  const chatEnd=useRef(null);

  useEffect(()=>{
    sg("wla_loads").then(v=>{if(v)setLoads(v);});
    sg("wla_st").then(v=>{if(v)setSt(v);});
    sg("wla_grest").then(v=>{if(v!=null)setGRest(v);});
  },[]);
  useEffect(()=>{if(Object.keys(loads).length)sw("wla_loads",loads);},[loads]);
  useEffect(()=>{if(Object.keys(st).length)sw("wla_st",st);},[st]);
  useEffect(()=>{sw("wla_grest",gRest);},[gRest]);

  useEffect(()=>{
    if(rOn&&rt>0){iv.current=setInterval(()=>{setRt(t=>{if(t<=1){clearInterval(iv.current);setROn(false);beep();return 0;}return t-1;});},1000);}
    return()=>clearInterval(iv.current);
  },[rOn]);
  useEffect(()=>{chatEnd.current?.scrollIntoView({behavior:"smooth"});},[chat]);

  const startRest=()=>{clearInterval(iv.current);setRt(gRest);setRTot(gRest);setROn(true);};
  const stopRest=()=>{clearInterval(iv.current);setROn(false);setRt(0);};
  const markSerie=(di,exKey,i)=>{const k=`${di}_${exKey}_${i}`;if(st[k])return;setSt(p=>({...p,[k]:true}));startRest();};

  const sendChat=async()=>{
    if(!chatIn.trim()||chatLd)return;
    const msg=chatIn.trim();setChatIn("");
    setChat(p=>[...p,{role:"user",content:msg}]);
    setChatLd(true);
    try{
      const sys=`Voce e um coach completo com duas especialidades:\n1. PERSONAL TRAINER — treino hibrido (forca + corrida), preparacao maratona\n2. NUTRICIONISTA ESPORTIVO — composicao corporal, performance endurance\n\nPerfil: Lucas Azevedo, 30 anos, 173cm, ~77kg, 35% gordura.\nMetas: maratona julho/2026, 15km a 5:30/km dezembro/2026, reduzir gordura.\nRotina: treina 05:35-06:30 em Sao Caetano do Sul. Sauna no almoco alguns dias. Garmin 565, Strava, Hevy. Max 4 refeicoes/dia + whey.\n\nTreino atual: ${JSON.stringify(data)}\nNutricao atual: ${JSON.stringify(nutri)}\n\nSempre em portugues. Direto e pratico.\nTreino → personal. Alimentacao → nutricionista. Pode misturar.\nNovo treino em JSON: mesmo formato com dias[]. Novo plano nutri JSON: mesmo formato com refeicoes[].`;
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:sys,messages:[...chat.map(m=>({role:m.role,content:m.content})),{role:"user",content:msg}]})});
      const d=await res.json();
      const reply=d.content?.[0]?.text||"Erro.";
      setChat(p=>[...p,{role:"assistant",content:reply}]);
      const m=reply.match(/```json\s*([\s\S]*?)```/);
      if(m){try{const p=JSON.parse(m[1]);if(p.dias)setData(p);if(p.refeicoes)setNutri(prev=>({...prev,...p}));}catch{}}
    }catch{setChat(p=>[...p,{role:"assistant",content:"Erro de conexão. Tenta de novo."}]);}
    setChatLd(false);
  };

  const loadJSON=()=>{try{const p=JSON.parse(jsonIn);if(!p.dias)throw new Error("Faltou campo 'dias'");setData(p);setJsonErr("");setJsonIn("");setShowJson(false);}catch(e){setJsonErr(e.message);}};

  const days=data.dias||[];
  const selDay=dayIdx!=null?days[dayIdx]:null;
  const principal=Array.isArray(selDay?.bloco?.principal)?selDay.bloco.principal:[];
  const core=Array.isArray(selDay?.bloco?.core)?selDay.bloco.core:[];
  const isRun=!!(selDay&&!Array.isArray(selDay?.bloco?.principal)&&selDay?.bloco?.principal?.tipo);

  const ExCard=({ex,di})=>{
    const exKey=ex.ordem||ex.exercicio;
    const tot=ex.series||1;
    const doneN=Array.from({length:tot}).filter((_,i)=>st[`${di}_${exKey}_${i}`]).length;
    const allDone=doneN===tot;
    const gif=getGif(ex.exercicio);
    const isExp=expEx===`${di}_${exKey}`;
    const loadVal=loads[ex.exercicio]||"";
    const tips=getTips(ex.exercicio);
    const repsStr=ex.reps?`${ex.reps} reps`:ex.duracao_s?`${ex.duracao_s}s`:ex.reps_cada_lado?`${ex.reps_cada_lado} por lado`:"";
    return(
      <div style={{background:allDone?T.accDk:T.s2,border:`1px solid ${allDone?T.accMd:T.br}`,borderRadius:18,marginBottom:14,overflow:"hidden"}}>
        {gif&&(
          <div style={{width:"100%",height:210,background:"#040404",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
            <img src={gif} alt={ex.exercicio} style={{width:"100%",height:"100%",objectFit:"contain"}} onError={e=>{e.target.parentElement.style.display="none";}}/>
          </div>
        )}
        <div style={{padding:"16px 16px 14px"}}>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:10}}>
            <div style={{flex:1,paddingRight:8}}>
              <div style={{fontSize:19,fontWeight:800,color:allDone?T.acc:T.txt,lineHeight:1.2,marginBottom:8}}>{ex.ordem?`${ex.ordem}. `:""}{ex.exercicio}</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {ex.series&&<span style={{fontSize:13,background:T.blDk,color:T.bl,borderRadius:7,padding:"4px 10px",fontWeight:700}}>{ex.series} séries</span>}
                {repsStr&&<span style={{fontSize:13,background:T.blDk,color:T.bl,borderRadius:7,padding:"4px 10px",fontWeight:700}}>{repsStr}</span>}
                {ex.rpe&&<span style={{fontSize:12,background:T.s3,color:T.sub,borderRadius:7,padding:"4px 10px"}}>RPE {ex.rpe}</span>}
              </div>
            </div>
            {allDone&&<div style={{fontSize:30,flexShrink:0}}>✅</div>}
          </div>

          <div style={{marginBottom:14}}>
            <div style={{fontSize:10,color:T.sub,fontWeight:700,letterSpacing:.8,marginBottom:6}}>CARGA (kg)</div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <input value={loadVal} onChange={e=>setLoads(p=>({...p,[ex.exercicio]:e.target.value}))} placeholder="0" type="number"
                style={{width:88,background:T.s1,border:`2px solid ${loadVal?T.acc:T.br2}`,borderRadius:12,padding:"12px 8px",fontSize:26,fontWeight:900,color:loadVal?T.acc:T.sub,outline:"none",textAlign:"center"}}/>
              <span style={{fontSize:16,color:T.sub}}>kg</span>
              {loadVal&&loads[ex.exercicio+"_prev"]&&<span style={{fontSize:12,color:T.sub,marginLeft:4}}>ant. {loads[ex.exercicio+"_prev"]}kg</span>}
              {doneN>0&&<span style={{marginLeft:"auto",fontSize:13,color:T.acc,fontWeight:700}}>{doneN}/{tot} ✓</span>}
            </div>
          </div>

          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
            {Array.from({length:tot}).map((_,i)=>{
              const done=st[`${di}_${exKey}_${i}`];
              return(
                <button key={i} onClick={()=>markSerie(di,exKey,i)}
                  style={{width:58,height:58,borderRadius:14,background:done?T.acc:T.s1,border:`2px solid ${done?T.acc:T.br2}`,color:done?"#000":T.sub,fontSize:done?24:16,fontWeight:800,cursor:done?"default":"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,WebkitTapHighlightColor:"transparent"}}>
                  {done?"✓":i+1}
                </button>
              );
            })}
          </div>

          <button onClick={()=>setExpEx(isExp?null:`${di}_${exKey}`)}
            style={{background:"none",border:`1px solid ${T.br2}`,borderRadius:8,color:T.sub,fontSize:13,cursor:"pointer",padding:"6px 12px",display:"flex",alignItems:"center",gap:5,marginBottom:isExp?10:0,WebkitTapHighlightColor:"transparent"}}>
            <span>{isExp?"▾":"▸"}</span>{isExp?"Ocultar técnica":"Ver técnica e dicas"}
          </button>
          {isExp&&(
            <div style={{background:T.s1,border:`1px solid ${T.br}`,borderRadius:12,padding:"14px 16px"}}>
              {ex.cue&&<div style={{fontSize:15,color:T.txt,fontWeight:700,marginBottom:12,lineHeight:1.4}}>🎯 {ex.cue}</div>}
              {tips.map((tip,i)=>(
                <div key={i} style={{fontSize:13,color:"#bbb",marginBottom:10,paddingLeft:12,borderLeft:`3px solid ${T.accMd}`,lineHeight:1.6}}>{tip}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const NAV=[{id:"semana",icon:"📅",label:"Semana"},{id:"treino",icon:"🏋",label:"Treino"},{id:"coach",icon:"💬",label:"Coach"},{id:"nutri",icon:"🥗",label:"Nutrição"}];

  return(
    <div style={{background:T.bg,minHeight:"100vh",color:T.txt,fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif"}}>

      {/* TOP NAV */}
      <div style={{background:T.s1,borderBottom:`1px solid ${T.br}`,display:"flex",alignItems:"stretch",position:"sticky",top:0,zIndex:30}}>
        {NAV.map(n=>(
          <button key={n.id}
            onClick={()=>{setTab(n.id);if(n.id==="treino"&&dayIdx==null&&days.length>0)setDayIdx(0);}}
            style={{flex:1,background:"none",border:"none",borderBottom:`3px solid ${tab===n.id?T.acc:"transparent"}`,padding:"13px 4px 11px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,WebkitTapHighlightColor:"transparent"}}>
            <span style={{fontSize:20}}>{n.icon}</span>
            <span style={{fontSize:10,color:tab===n.id?T.acc:T.sub,fontWeight:tab===n.id?700:400}}>{n.label}</span>
          </button>
        ))}
        {rt>0&&(
          <div style={{display:"flex",alignItems:"center",padding:"0 14px",color:T.acc,fontWeight:900,fontSize:20,minWidth:72,justifyContent:"center"}}>
            {rt}s
          </div>
        )}
      </div>

      {/* REST BANNER */}
      {rt>0&&(
        <div style={{background:T.accDk,borderBottom:`1px solid ${T.accMd}`,padding:"14px 16px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
            <div>
              <div style={{fontSize:11,color:T.acc,fontWeight:700,letterSpacing:1,marginBottom:2}}>DESCANSO</div>
              <div style={{fontSize:52,fontWeight:900,color:T.acc,lineHeight:1,letterSpacing:-2}}>{rt}s</div>
            </div>
            <button onClick={stopRest}
              style={{background:T.accMd,border:`1px solid ${T.acc}55`,color:T.acc,borderRadius:14,padding:"14px 24px",fontSize:16,fontWeight:800,cursor:"pointer",WebkitTapHighlightColor:"transparent"}}>
              Pular ›
            </button>
          </div>
          <div style={{height:6,background:T.accMd,borderRadius:99}}>
            <div style={{height:"100%",width:`${Math.round((rt/rTot)*100)}%`,background:T.acc,borderRadius:99,transition:"width 1s linear"}}/>
          </div>
        </div>
      )}

      <div style={{padding:"14px 14px 32px"}}>

        {/* SEMANA */}
        {tab==="semana"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{fontSize:12,color:T.sub}}>{data.tipo_de_semana} · {data.semanas_para_maratona} semanas p/ maratona</div>
              <button onClick={()=>setShowJson(!showJson)}
                style={{background:"none",border:`1px solid ${T.br2}`,color:T.sub,borderRadius:8,padding:"5px 10px",fontSize:12,cursor:"pointer"}}>
                📥 JSON
              </button>
            </div>
            {showJson&&(
              <div style={{background:T.s2,border:`1px solid ${T.br}`,borderRadius:14,padding:"14px",marginBottom:14}}>
                <div style={{fontSize:13,color:T.sub,marginBottom:8}}>Cole o JSON gerado pelo Coach — ou auto-carrega quando o Coach gera um novo treino.</div>
                <textarea value={jsonIn} onChange={e=>setJsonIn(e.target.value)} placeholder='{"fase_atual":"Build","dias":[...]}'
                  style={{width:"100%",height:140,background:T.s1,border:`1px solid ${T.br}`,borderRadius:10,padding:"10px",fontSize:12,color:T.txt,fontFamily:"monospace",resize:"vertical",outline:"none",boxSizing:"border-box"}}/>
                {jsonErr&&<div style={{color:T.rd,fontSize:12,margin:"6px 0"}}>{jsonErr}</div>}
                <div style={{display:"flex",gap:8,marginTop:8}}>
                  <button onClick={loadJSON} style={{background:T.acc,color:"#000",border:"none",borderRadius:10,padding:"10px 20px",fontSize:14,fontWeight:800,cursor:"pointer"}}>Carregar</button>
                  <button onClick={()=>setJsonIn(JSON.stringify(data,null,2))} style={{background:"none",border:`1px solid ${T.br}`,color:T.sub,borderRadius:10,padding:"10px 14px",fontSize:13,cursor:"pointer"}}>Ver atual</button>
                </div>
              </div>
            )}
            {days.map((day,di)=>{
              const{done,tot}=dayProg(day,st,di);
              const pct=tot>0?Math.round((done/tot)*100):0;
              const isRunDay=day.tipo?.toLowerCase().includes("corrida")||day.tipo?.toLowerCase().includes("longo");
              const isOff=day.tipo?.toLowerCase().includes("off");
              const hasEx=Array.isArray(day.bloco?.principal)&&day.bloco.principal.length>0||Array.isArray(day.bloco?.core)&&day.bloco.core.length>0||!Array.isArray(day.bloco?.principal)&&day.bloco?.principal?.tipo;
              const icon=isRunDay?"🏃":isOff?"🛌":day.tipo?.toLowerCase().includes("superior")?"💪":"🦵";
              return(
                <div key={di} onClick={()=>{if(hasEx){setDayIdx(di);setTab("treino");}}}
                  style={{background:T.s2,border:`1px solid ${pct===100&&tot>0?T.accMd:T.br}`,borderRadius:16,padding:"14px 16px",marginBottom:10,cursor:hasEx?"pointer":"default",WebkitTapHighlightColor:"transparent"}}>
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:tot>0?10:0}}>
                    <div style={{width:46,height:46,borderRadius:13,background:T.s3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{icon}</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:16,fontWeight:700}}>{day.dia} <span style={{fontSize:12,fontWeight:400,color:T.sub}}>{day.data_referencia}</span></div>
                      <div style={{fontSize:12,color:T.sub,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{day.tipo}{day.duracao_min?` · ${day.duracao_min}min`:""}</div>
                    </div>
                    {tot>0?<span style={{background:pct===100?T.accDk:T.s3,color:pct===100?T.acc:T.sub,border:`1px solid ${pct===100?T.accMd:T.br}`,borderRadius:20,padding:"4px 12px",fontSize:13,fontWeight:700,whiteSpace:"nowrap"}}>{done}/{tot}</span>
                    :isRunDay?<span style={{fontSize:12,color:T.bl,fontWeight:700}}>Z2</span>
                    :<span style={{fontSize:12,color:T.sub}}>OFF</span>}
                  </div>
                  {tot>0&&<div style={{height:3,background:T.s3,borderRadius:99}}><div style={{height:"100%",width:`${pct}%`,background:T.acc,borderRadius:99,transition:"width .4s"}}/></div>}
                  {isRunDay&&!Array.isArray(day.bloco?.principal)&&day.bloco?.principal?.pace_alvo&&(
                    <div style={{marginTop:8,fontSize:12,color:T.bl}}>Pace {day.bloco.principal.pace_alvo} · BPM {day.bloco.principal.bpm_alvo}</div>
                  )}
                  {day.sauna_almoco&&<div style={{marginTop:4,fontSize:11,color:"#ff9d3a"}}>🔥 Sauna no almoço</div>}
                </div>
              );
            })}
          </div>
        )}

        {/* TREINO */}
        {tab==="treino"&&(
          <div>
            <div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:14,paddingBottom:4,WebkitOverflowScrolling:"touch"}}>
              {days.map((d,i)=>{
                const{done,tot}=dayProg(d,st,i);
                return(
                  <button key={i} onClick={()=>setDayIdx(i)}
                    style={{flexShrink:0,background:dayIdx===i?T.acc:T.s2,border:`1px solid ${dayIdx===i?T.acc:T.br}`,borderRadius:10,padding:"8px 14px",color:dayIdx===i?"#000":T.sub,fontSize:13,fontWeight:dayIdx===i?800:400,cursor:"pointer",WebkitTapHighlightColor:"transparent",position:"relative"}}>
                    {d.dia}
                    {tot>0&&done===tot&&<span style={{position:"absolute",top:-4,right:-4,fontSize:10,background:T.acc,color:"#000",borderRadius:99,width:14,height:14,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>✓</span>}
                  </button>
                );
              })}
            </div>

            {selDay?(
              <div>
                <div style={{marginBottom:14}}>
                  <div style={{fontSize:22,fontWeight:900,letterSpacing:-.5,marginBottom:2}}>{selDay.tipo}</div>
                  <div style={{fontSize:13,color:T.sub}}>{selDay.data_referencia} · {selDay.duracao_min}min{selDay.sauna_almoco?" · 🔥 Sauna almoço":""}</div>
                </div>

                {/* Global rest */}
                <div style={{background:T.s2,border:`1px solid ${T.br}`,borderRadius:14,padding:"12px 14px",marginBottom:14}}>
                  <div style={{fontSize:10,color:T.sub,fontWeight:700,letterSpacing:.8,marginBottom:8}}>DESCANSO GLOBAL (todos os exercícios)</div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
                    {[30,45,60,90,120].map(s=>(
                      <button key={s} onClick={()=>setGRest(s)}
                        style={{background:gRest===s?T.acc:T.s3,border:`1px solid ${gRest===s?T.acc:T.br}`,color:gRest===s?"#000":T.sub,borderRadius:9,padding:"9px 14px",fontSize:14,fontWeight:gRest===s?800:400,cursor:"pointer",WebkitTapHighlightColor:"transparent"}}>
                        {s}s
                      </button>
                    ))}
                    <input value={gRest} onChange={e=>setGRest(Number(e.target.value)||60)} type="number"
                      style={{width:62,background:T.s1,border:`1px solid ${T.br}`,borderRadius:9,padding:"9px 8px",fontSize:14,color:T.acc,fontWeight:700,outline:"none",textAlign:"center"}}/>
                  </div>
                </div>

                {selDay.atencao&&<div style={{background:T.orDk,border:`1px solid ${T.or}44`,borderRadius:12,padding:"12px 14px",marginBottom:14,fontSize:13,color:T.or,lineHeight:1.5}}>⚠ {selDay.atencao}</div>}

                {selDay.bloco?.aquecimento&&(
                  <div style={{marginBottom:16}}>
                    <div style={{fontSize:10,fontWeight:700,color:T.sub,letterSpacing:1,marginBottom:8}}>AQUECIMENTO · {selDay.bloco.aquecimento.duracao_min}min</div>
                    {selDay.bloco.aquecimento.atividades.map((a,i)=>(
                      <div key={i} style={{fontSize:13,color:T.sub,padding:"5px 0 5px 12px",borderLeft:`2px solid ${T.br2}`,marginBottom:2}}>{a}</div>
                    ))}
                  </div>
                )}

                {principal.length>0&&(
                  <>
                    <div style={{fontSize:10,fontWeight:700,color:T.sub,letterSpacing:1,marginBottom:12}}>PRINCIPAL</div>
                    {principal.map((ex,i)=><ExCard key={i} ex={ex} di={dayIdx}/>)}
                  </>
                )}

                {isRun&&(
                  <div style={{background:T.blDk,border:`1px solid ${T.bl}44`,borderRadius:18,padding:"18px 18px"}}>
                    <div style={{fontSize:16,fontWeight:800,color:T.bl,marginBottom:14}}>🏃 {selDay.bloco.principal.tipo}</div>
                    {[["Duração",selDay.bloco.principal.duracao_min&&`${selDay.bloco.principal.duracao_min} min`],["Distância",selDay.bloco.principal.distancia_km&&`${selDay.bloco.principal.distancia_km} km`],["Pace alvo",selDay.bloco.principal.pace_alvo],["BPM alvo",selDay.bloco.principal.bpm_alvo]].filter(([,v])=>v).map(([l,v])=>(
                      <div key={l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${T.br}`}}>
                        <span style={{fontSize:13,color:T.sub}}>{l}</span>
                        <span style={{fontSize:18,fontWeight:800,color:T.acc}}>{v}</span>
                      </div>
                    ))}
                    {selDay.bloco.principal.criterio_ajuste&&<div style={{marginTop:12,fontSize:12,color:T.bl,fontStyle:"italic",lineHeight:1.5}}>{selDay.bloco.principal.criterio_ajuste}</div>}
                  </div>
                )}

                {core.length>0&&(
                  <>
                    <div style={{fontSize:10,fontWeight:700,color:T.sub,letterSpacing:1,margin:"18px 0 12px"}}>CORE</div>
                    {core.map((ex,i)=><ExCard key={i} ex={ex} di={dayIdx}/>)}
                  </>
                )}

                {selDay.bloco?.desaquecimento&&(
                  <div style={{marginTop:16}}>
                    <div style={{fontSize:10,fontWeight:700,color:T.sub,letterSpacing:1,marginBottom:8}}>DESAQUECIMENTO · {selDay.bloco.desaquecimento.duracao_min}min</div>
                    {selDay.bloco.desaquecimento.atividades.map((a,i)=>(
                      <div key={i} style={{fontSize:13,color:T.sub,padding:"5px 0 5px 12px",borderLeft:`2px solid ${T.br2}`,marginBottom:2}}>{a}</div>
                    ))}
                  </div>
                )}

                {selDay.plano_b_25min&&<div style={{background:T.s2,border:`1px solid ${T.br}`,borderRadius:12,padding:"12px 14px",marginTop:14,fontSize:13,color:T.sub}}>📋 Plano B (25min): {selDay.plano_b_25min}</div>}
                {selDay.nutricao&&<div style={{background:T.accDk,border:`1px solid ${T.accMd}`,borderRadius:12,padding:"12px 14px",marginTop:12,fontSize:13,color:T.acc,lineHeight:1.5}}>🥗 {selDay.nutricao}</div>}
              </div>
            ):(
              <div style={{textAlign:"center",padding:"48px 0",color:T.sub}}>Selecione um dia acima</div>
            )}
          </div>
        )}

        {/* COACH */}
        {tab==="coach"&&(
          <div style={{display:"flex",flexDirection:"column",height:"72vh"}}>
            <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:8,marginBottom:12,WebkitOverflowScrolling:"touch"}}>
              {chat.map((m,i)=>(
                <div key={i} style={{background:m.role==="user"?T.accDk:T.s2,border:`1px solid ${m.role==="user"?T.accMd:T.br}`,borderRadius:16,padding:"12px 14px",alignSelf:m.role==="user"?"flex-end":"flex-start",maxWidth:"90%",fontSize:14,lineHeight:1.7,color:T.txt,whiteSpace:"pre-wrap",borderBottomRightRadius:m.role==="user"?4:16,borderBottomLeftRadius:m.role==="assistant"?4:16}}>
                  {m.content}
                </div>
              ))}
              {chatLd&&(
                <div style={{background:T.s2,border:`1px solid ${T.br}`,borderRadius:16,borderBottomLeftRadius:4,padding:"12px 16px",alignSelf:"flex-start",fontSize:13,color:T.sub}}>
                  Pensando...
                </div>
              )}
              <div ref={chatEnd}/>
            </div>
            <div style={{display:"flex",gap:8}}>
              <input value={chatIn} onChange={e=>setChatIn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()}
                placeholder="Treino, nutrição, carga, ajuste..."
                style={{flex:1,background:T.s2,border:`1px solid ${T.br}`,borderRadius:14,padding:"14px 16px",fontSize:15,color:T.txt,outline:"none"}}/>
              <button onClick={sendChat} disabled={chatLd}
                style={{background:chatLd?T.s3:T.acc,color:"#000",border:"none",borderRadius:14,padding:"14px 20px",fontSize:22,fontWeight:900,cursor:chatLd?"not-allowed":"pointer",WebkitTapHighlightColor:"transparent",opacity:chatLd?.5:1}}>›</button>
            </div>
          </div>
        )}

        {/* NUTRIÇÃO */}
        {tab==="nutri"&&(
          <div>
            <div style={{fontSize:12,color:T.sub,marginBottom:14,lineHeight:1.5}}>{nutri.objetivo}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
              {[["Kcal",nutri.calorias,""],["Proteína",nutri.proteina_g,"g"],["Carboidrato",nutri.carbo_g,"g"],["Gordura",nutri.gordura_g,"g"]].map(([l,v,u])=>(
                <div key={l} style={{background:T.s2,border:`1px solid ${T.br}`,borderRadius:14,padding:"14px 16px"}}>
                  <div style={{fontSize:11,color:T.sub,marginBottom:4,fontWeight:600}}>{l}</div>
                  <div style={{fontSize:28,fontWeight:900,color:T.acc,lineHeight:1}}>{v}<span style={{fontSize:14,fontWeight:400}}>{u}</span></div>
                </div>
              ))}
            </div>
            {nutri.refeicoes.map((r,i)=>(
              <div key={i} style={{background:T.s2,border:`1px solid ${T.br}`,borderRadius:16,padding:"16px",marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <div>
                    <div style={{fontSize:16,fontWeight:700,marginBottom:2}}>{r.nome}</div>
                    <div style={{fontSize:12,color:T.sub}}>🕐 {r.horario}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:13,background:T.accDk,color:T.acc,border:`1px solid ${T.accMd}`,borderRadius:8,padding:"4px 10px",marginBottom:4,fontWeight:700}}>{r.proteina}g prot</div>
                    <div style={{fontSize:11,color:T.sub}}>{r.kcal} kcal</div>
                  </div>
                </div>
                {r.itens.map((it,j)=>(<div key={j} style={{fontSize:14,color:"#ccc",paddingLeft:12,marginBottom:4,borderLeft:`2px solid ${T.br2}`}}>{it}</div>))}
              </div>
            ))}
            <div style={{background:T.s2,border:`1px solid ${T.br}`,borderRadius:14,padding:"14px 16px",marginBottom:10}}>
              <div style={{fontSize:14,fontWeight:700,marginBottom:8}}>💧 Hidratação</div>
              <div style={{fontSize:13,color:T.sub,lineHeight:1.6}}>{nutri.hidratacao}</div>
            </div>
            <div style={{background:T.s2,border:`1px solid ${T.br}`,borderRadius:14,padding:"14px 16px",marginBottom:10}}>
              <div style={{fontSize:14,fontWeight:700,marginBottom:8}}>💊 Suplementos</div>
              {nutri.suplementos.map((s,i)=>(<div key={i} style={{fontSize:13,color:T.sub,marginBottom:6,paddingLeft:12,borderLeft:`2px solid ${T.br2}`}}>{s}</div>))}
            </div>
            <div style={{background:T.accDk,border:`1px solid ${T.accMd}`,borderRadius:14,padding:"14px 16px",fontSize:13,color:T.acc,lineHeight:1.6}}>{nutri.nota}</div>
          </div>
        )}

      </div>
    </div>
  );
}
