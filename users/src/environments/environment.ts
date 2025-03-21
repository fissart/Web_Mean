export const environment = {
  production: false,
  title: 'Local Environment Heading',
  //apiURL: 'http://localhost:8000'
  apiURL: 'https://www.esfapa.edu.pe:9797'
};
/*
      
{{www.length!=0?www.note:null}}
db.users.updateMany({}, {"$set": {"ciclo": ''}})

db.curses.updateMany({}, {"$set": {"show": "false"}});
db.integers.updateMany({}, {"$set": {"show": "false"}});
db.curses.updateMany({},{"$unset":{"show":1}});
//db.integers.deleteMany({user:ObjectId('62cf3499f1443acd8c3dc41e')})//teacher amanda as std

db.integers.deleteMany({user:ObjectId("62d6dac1d89e8b2b50ea9de0")})
db.tasks.deleteMany({user:ObjectId("62d6dac1d89e8b2b50ea9de0")})
db.averages.updateMany({user:ObjectId("62d6dac1d89e8b2b50ea9de0")},{$set:{user:ObjectId("64022bb8802b1c61ce210998")}})

db.averages.updateMany(
  {},
  [{ $set: { nota: { $trim: { input: "$nota" } } } }]
)
db.averages.updateMany({nota:""},{$set:{nota:"0"}})



//Cambiar contenido de campos
db.averages.updateMany({especialidad:"AP"}, {"$set": {"especialidad": "P"}})
db.averages.updateMany({nota:"0"}, {"$set": {"nota": "-0"}})
db.averages.updateMany({nota:"-0"}, {"$set": {"nota": "0"}})

db.tasks.updateMany({note:"5"}, {"$set": {"note": "0"}})



db.users.aggregate([
        {
            $group: {
                _id: "$rol", total: { $sum: 1 },
            }
        },
        {
            $lookup: {
                from: "users",
                let: { www: "$_id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$rol", "$$www"] } } },
                    {
                        $group: {
                            _id: "$mencion", total: { $sum: 1 },
                        }
                    },
                    {
                        $lookup: {
                            from: "users",
                            let: { wwwww: "$_id" },
                            pipeline: [
                                { $match: { $expr: {$and: [{ $eq: ["$mencion", "$$wwwww"] },{ $eq: ["$rol", "$$www"] }] }} },
                                { $sort: { "name": 1 } },
                            ],
                            as: "ussers",
                        },
                    },
                    
                ],
                as: "mencions",
            },
        },
        { $sort: { "_id": 1 } },
    ], { collation: { locale: "es" }})

db.users.updateMany({mencion:{$nin:["E","G","P","ED"]}, rol:"3"},{$set:{dni,{$set:{mencion:"N",ciclo:"N"}})
db.users.updateMany({},{$set:{filosophy:""}})
db.users.updateMany({rol:"2"},{$set:{filosophy:"New"}})
db.users.updateMany({rol:"2"},{$set:{mencion:"N"}})

db.averages.aggregate([
  {
    $match: {
      $and: [
        { ciclo: {$in: ['I', 'III', 'V', 'VII', 'IX']} },
        { mencion: {$in: ['G', 'E', 'P']} },
        { year: "2022" }
      ]
    },
  },
  {
    $group: {
      _id: "$title",
      mension: { $first: '$title' },
      codigo: { $first: '$codigo' },
      cursos: { $sum: 1 },
    }
  },
]).pretty();

Puntaje: { $sum: { $multiply: [{ $toInt: '$credito' }, { $toInt: '$nota' }] } },


db.averages.find({nota: ''}).count()
db.averages.find({nota:'R'}).count()
db.averages.find({nota:'L'}).count()


db.averages.find({nota:{$in: ['L', 'R', '']}}).count()
db.averages.find({nota:{$nin: ['', 'R', 'L'], $lt:'10.5'}}).count()

db.averages.find({year: '2022', especialidad:'P', ciclo:'I', nota:{$in: ['00', '-0', '0']}}).count()
db.averages.find({year: '2022', especialidad:'P', ciclo:'I', nota:'0'}).count()
db.averages.find({year: '2022', especialidad:'P', ciclo:'I', nota:'-0'}).count()
db.averages.find({year: '2022', especialidad:'P', ciclo:'I', nota:'00'}).count()

db.averages.find({year: '2022', especialidad:'P', ciclo:'I', nota:{$nin: ['', 'R', 'L'], $gt:'10.5'}}).count()
db.averages.find({year: '2022', especialidad:'P', ciclo:'I', nota:{$nin: ['', 'R', 'L'], $lt:'10.5'}}).count()

sin nota 8
retirados 425
licencia 97
desaprobados 93
aprobados 2275
total 2898

db.nomina.aggregate([
    {
        $match: {
          $and: [
               {ciclo: "I"},
               {mension: "P"}
           ]
        },
    },
    {
        $lookup: {
            from: "users",
            let: { www: "$dni" },
            pipeline: [
              { $match: { $expr: { $eq: ["$dni", "$$www"] } } },
              { $project : { _id:1, name:1 } }
            ],
            as: "userw",
        },
    },
    {$sort:{"userw.name":1}}
]).pretty();

db.averages.aggregate([
    {$group : {_id:"$user", count:{$sum:1}}},
    {$sort:{"count":1}}
])

//delete collection
db.nomina.deleteMany({})

db.averages.aggregate([
    {
        $match: {
          $and: [
               {ciclo: "I"},
               {especialidad: "ED"}
           ]
        },
    },
    {$group : {
      _id:{user:"$user"}, cursos:{$sum:1},
      Puntaje: { $sum: { $multiply: [ 3, {$toInt:'$nota'} ] } },
    }},
    {$lookup: {from: "users", localField: "_id.user", foreignField: "_id", as: "www"}},
    {$sort:{"Puntaje":-1}}
]).pretty()


db.averages.aggregate([
    {
        $match: {
          $and: [
               {ciclo: "I"},
               {especialidad: "ED"}
           ]
        },
    },
    {$group : {
      _id:{user:"$title"}, estudiantes:{$sum:1},
      Puntaje: { $sum: { $multiply: [ 3, {$toInt:'$nota'} ] } },
    }},
    {
          $lookup: {
            from: "averages",
            let: { www: "$_id.user" },
            pipeline: [
               { $match: { $expr: { $eq: ["$title", "$$www"] } } },
               {
                     $lookup: {
                       from: "users",
                       let: { www: "$user" },
                       pipeline: [
                          { $match: { $expr: { $and: [{ $eq: ["$_id", "$$www"] }, { $eq: ["$especialidad",  "ED"] },] } }},
                       ],
                       as: "cursew",
                     },
               },

            ],
            as: "cursew",
          },
    },
    {$sort:{"Puntaje":-1}}
]).pretty()


$multiply:['$quantity',{$toInt:'$product.prize'}]


Ecosistema
Fundamentos Visuales III
Comunicación Visual I
Historia del Arte II
Dibujo III
Geometria Descriptiva
Psicologia del Arte
Taller Principal III - Grabado y Diseño Gráfico

db.users.insertMany([
  {
    "email" : "he,rryvilca@esfapa.edu.pe",
    "sexo" : "M",
    "name" : "VILCA BLAS, Henrry Alvaro",
    "celular" : "949437872",
    "dni" : "70449235",
    "mension" : "P",
    "rol" : "3",
    "foto" : "uploads/user/70449235.jpg",
    "password" : "70449235",
    "ciclo" : ""
  }
])


  db.nomina.insertMany(
  [
  {dni :"70449235", ciclo : "I", mencion : "P", name:"VILCA BLAS, Henrry Alvaro"},
  {dni :"77687002", ciclo : "I", mencion : "P", name:"VILLAVICENCIO LAZO, Danuska Ashley"},
  ])


db.example.aggregate([
  { $project : { city_state : { $split: ["$city", ", "] }, qty : 1 } },
  { $unwind : "$city_state" },
  { $group : { _id: { "state" : "$city_state" }, total_qty : { "$sum" : "$qty" } } },
  { $match : { city_state : /[A-Z]{2}/ } },
  { $sort : { total_qty : -1 } }
]);

db.example.aggregate([
  { $project : { city_state : { $split: ["$city", ", "] }, qty : 1 } },
  { $unwind : "$city_state" },
  { $match : { city_state : /[A-Z]{2}/ } },
  { $group : { _id: { "state" : "$city_state" }, total_qty : { "$sum" : "$qty" } } },
]);

db.users.insertMany([
{rol:"3",password:"44334139",dni:"44334139", name:"VILCA PAREJA, YURI ANDERSON", email:"yurivilca@esfapa.edu.pe", celular:"999196122"},
{rol:"3",password:"76582573",dni:"76582573", name:"VILLANTOY SALCEDO, JUDITH LILIANA", email:"judithvillantoy@esfapa.edu.pe", celular:"976716338"},
{rol:"3",password:"79625848",dni:"79625848", name:"ZAPATA MENDOZA, YANETH ROSSMERY", email:"yanethzapata@esfapa.edu.pe", celular:"920827337"},
]);


db.users.insertMany([
{rol:"3", password:"28298872", dni:"28298872", name:"AÑAÑOS CORDOVA, MARCEL MAGALY", email:"marcelañaños@esfapa.edu.pe", celular:"990081022"},
{rol:"3", password:"72916285", dni:"72916285", name:"AVILES BUSTILLOS, ELIANA PAOLA", email:"alianaaviles@esfapa.edu.pe", celular:"953081356"},
{rol:"3", password:"60045251", dni:"60045251", name:"ASTO HUAMANI, ANYELI", email:"anyeliasto@esfapa.edu.pe", celular:"925288922"},
{rol:"3", password:"73048527", dni:"73048527", name:"CANCHO ROMANI, MELANI LUCERO", email:"malanicancho@esfapa.edu.pe", celular:"917439677"},
{rol:"3", password:"60920241", dni:"60920241", name:"DUEÑAS MICULLYA, JUAN DIEGO", email:"juandueñas@esfapa.edu.pe", celular:"901887170"},
{rol:"3", password:"71269080", dni:"71269080", name:"ESCRIBA GOMEZ, MIGUEL ANGEL", email:"miguelescriba@esfapa.edu.pe", celular:"935752705"},
{rol:"3", password:"70654640", dni:"70654640", name:"FELICES CERNA, RICKY ANDERSON", email:"rickyfelices@esfapa.edu.pe", celular:"930255365"},
{rol:"3", password:"74037346", dni:"74037346", name:"GALVEZ ANDIA, MALU SHANDIRA", email:"malugalvez@esfapa.edu.pe", celular:"961416790"},
{rol:"3", password:"70293213", dni:"70293213", name:"GAMBOA SALCEDO, FERNANDO JOSE", email:"fernandogamboa@esfapa.edu.pe", celular:"958147256"},
{rol:"3", password:"74926232", dni:"74926232", name:"GALLARDO JIMENEZ, MARIA GRACIA", email:"mariagallardo@esfapa.edu.pe", celular:"959896185"},
{rol:"3", password:"70391898", dni:"70391898", name:"HUARIPUMA HUAMANI, ANGIE CRISTELL", email:"angiehuaripuma@esfapa.edu.pe", celular:"930392163"},
{rol:"3", password:"74966072", dni:"74966072", name:"HUAMAN TINEO, JAVIER", email:"javierhuaman@esfapa.edu.pe", celular:"914905406"},
{rol:"3", password:"70222446", dni:"70222446", name:"JAIME MAURICIO, WILLIAMS", email:"williamsjaime@esfapa.edu.pe", celular:"913253851"},
{rol:"3", password:"44800793", dni:"44800793", name:"JULCA JUÁREZ, CECILIA ANDREA", email:"ceciliajulca@esfapa.edu.pe", celular:"966010009"},
{rol:"3", password:"75550374", dni:"75550374", name:"LUJAN HUAMANI, MAYLI YASURI", email:"maylilujan@esfapa.edu.pe", celular:"993170482"},
{rol:"3", password:"76942046", dni:"76942046", name:"PARIONA LUNAZCO, ZUNILDA", email:"zunildapariona@esfapa.edu.pe", celular:"982106591"},
{rol:"3", password:"60280568", dni:"60280568", name:"PEREZ ESPINO, LEYDE ANDREA", email:"leydeperez@esfapa.edu.pe", celular:"943926755"},
{rol:"3", password:"77223212", dni:"77223212", name:"QUISPE ÑAHUI, KAROL DEVORA", email:"karolquispe@esfapa.edu.pe", celular:"916193977"},
{rol:"3", password:"77143014", dni:"77143014", name:"QUISPE SOLIER, LISSETH", email:"lissethquisspe@esfapa.edu.pe", celular:"945013747"},
{rol:"3", password:"71892546", dni:"71892546", name:"QUISPE JORGE, JHONATAN ", email:"jhonatanquispe@esfapa.edu.pe", celular:"914540829"},
{rol:"3", password:"74203130", dni:"74203130", name:"REMACHI TOMAYLLA, ANA MARIEL", email:"anaremachi@esfapa.edu.pe", celular:"900644603"},
{rol:"3", password:"60229950", dni:"60229950", name:"ROJAS MIRANDA, ROSA LUZ", email:"rosarojas@esfapa.edu.pe", celular:"973469101"},
{rol:"3", password:"60862648", dni:"60862648", name:"SALAZAR QUISPE, ERIKA ANAHI", email:"erikasalazar@esfapa.edu.pe", celular:"973814950"},
{rol:"3", password:"71557596", dni:"71557596", name:"SANTIAGO QUISPE, ANA EDITH", email:"anasantiago@esfapa.edu.pe", celular:"990929928"},
{rol:"3", password:"70565842", dni:"70565842", name:"TINEO AGUIRRE, FRANK KEVIN", email:"franktineo@esfapa.edu.pe", celular:"970614678"},
{rol:"3", password:"76256740", dni:"76256740", name:"TORRES HUAMAN, KELLY SHANNON", email:"kellytorres@esfapa.edu.pe", celular:"900948907"},
{rol:"3", password:"70790755", dni:"70790755", name:"VELARDE HURTADO, IRVIN", email:"irvinvelarde@esfapa.edu.pe", celular:"963440823"},
{rol:"3", password:"70211974", dni:"70211974", name:"YARANGA MIRANDA, RONY", email:"ronyyaranga@esfapa.edu.pe", celular:"921409438"},
]);

db.users.insertMany([
{rol:"3",password:"75168638",dni:"75168638",	name:"AUQUI ROBLES, RAFAEL", email:"rafaelauqui@esfapa.edu.pe", celular:"976860126"},
{rol:"3",password:"77085317",dni:"77085317",	name:"BECERRA CABRERA, LUZ NELIA", email:"luzbacerra@esfapa.edu.pe", celular:"918699156"},
{rol:"3",password:"61335202",dni:"61335202",	name:"CAMBORDA MEDINA, ROSETTA JAZMIN", email:"rosettacamborda@esfapa.edu.pe", celular:"991833731"},
{rol:"3",password:"45459234",dni:"45459234",	name:"DURAND ARAUJO, JOSEPH", email:"josephdurand@esfapa.edu.pe", celular:"993809867"},
{rol:"3",password:"61421637",dni:"61421637",	name:"GALLARDO PAREDES, LEVY MAHEL", email:"levygallardo@esfapa.edu.pe", celular:"916046647"},
{rol:"3",password:"74590640",dni:"74590640",	name:"HUALLPA PRETELL, RUBI YOLANDA", email:"rubihuallpa@esfapa.edu.pe", celular:"932777843"},
{rol:"3",password:"70179787",dni:"70179787",	name:"HUAYTA CHUÑOCCA, CRISTHOFER", email:"cristhoferhuayta@esfapa.edu.pe", celular:"938429646"},
{rol:"3",password:"60043800",dni:"60043800",	name:"ORIUNDO NUÑEZ, CARL EULER", email:"carloriundo@esfapa.edu.pe", celular:"962933224"},
{rol:"3",password:"72484120",dni:"72484120",	name:"ORTIZ JUOLIZBERTTY, AZUMI URSULA", email:"azumiortiz@esfapa.edu.pe", celular:"914887369"},
{rol:"3",password:"73956498",dni:"73956498",	name:"PALOMINO CORAS, HENRY ERIK", email:"henrypalomino@esfapa.edu.pe", celular:"900723925"},
{rol:"3",password:"60444970",dni:"60444970",	name:"PINCO CAMPOS, JHOSEPH ANTHONY", email:"jhosephpinco@esfapa.edu.pe", celular:"955823415"},
{rol:"3",password:"47189462",dni:"47189462",	name:"QUISPE HUAYA, BERNABE SANDO", email:"bernabequispe@esfapa.edu.pe", celular:"977118313"},
{rol:"3",password:"60922696",dni:"60922696",	name:"RAMOS RUA, DIDIER CLEYDER", email:"didierramos@esfapa.edu.pe", celular:"952816479"},
{rol:"3",password:"72630099",dni:"72630099",	name:"TIPPE TORRES, LUIS CARLOS", email:"luistippe@esfapa.edu.pe", celular:"966699777"},
{rol:"3",password:"70414626",dni:"70414626",	name:"TUEROS GOMEZ, SHIRLEY", email:"shirleytueros@esfapa.edu.pe", celular:"954274917"},
{rol:"3",password:"70460587",dni:"70460587",	name:"TUMBALOBOS HUAMAN, ANGIE SHARAI", email:"angietumbalobos@esfapa.edu.pe", celular:"966699777"},
])

db.users.insertMany([
{dni:"60862571",password:"60862571", name:"ALEJOS ROJAS, GUSTAVO", email:"gustavoalejos@esfapa.edu.pe",celular:"913215062"},
{dni:"62041065",password:"62041065", name:"CASAFRANCA ZAMORA, GABI MILAGROS", email:"gabicasafranca@esfapa.edu.pe",celular:"986861082"},
{dni:"70568815",password:"70568815", name:"GUTIERREZ ALCARRAZ, NORMA", email:"normagutierrez@esfapa.edu.pe",celular:"907841845"},
{dni:"60998112",password:"60998112", name:"JAIME TACAS, YEREMY JOSE", email:"yeremyjaime@esfapa.edu.pe",celular:"966103810"},
{dni:"46995549",password:"46995549", name:"LUJAN ROCA, WALTER LEONARDO", email:"walterlujan@esfapa.edu.pe",celular:"931431560"},
{dni:"44672544",password:"44672544", name:"PALACIOS HUAMAN, MONICA", email:"Mmonicapalacios@esfapa.edu.pe",celular:"937180250"},
{dni:"61271869",password:"61271869", name:"PALOMINO VARGAS, ADRIANA SOFIA", email:"adrianapalomino@esfapa.edu.pe",celular:"914654877"},
{dni:"72223376",password:"72223376", name:"PEÑA DE LA CRUZ, MELISSA GRIT", email:"melissapeña@esfapa.edu.pe",celular:"922924918"},
{dni:"77793910",password:"77793910", name:"POMA CARHUAPOMA, JORGE LUIS", email:"jorgepoma@esfapa.edu.pe",celular:"900174721"},
{dni:"70463035",password:"70463035", name:"SARAS LLAVE, ERICK YOMAR", email:"ericksaras@esfapa.edu.pe",celular:"945212218"},
{dni:"73772879",password:"73772879", name:"SALVATIERRA ROA, NATALY SAYURY", email:"natalysalvatierra@esfapa.edu.pe",celular:"910925520"},
])



//1
db.users.updateMany( {"carreramension" : "ARTISTA PROFESIONAL /GRABADO - DISEÑO GRÁFICO" }, {$set:{'mension':'G'}} );
db.users.updateMany( {"carreramension" : "ARTISTA PROFESIONAL /PINTURA" }, {$set:{'mension':'P'}} );
db.users.updateMany( {"carreramension" : "ARTISTA PROFESIONAL /ESCULTURA" }, {$set:{'mension':'E'}} );
db.users.updateMany( {"carreramension" : "EDUCACIÓN ARTÍSTICA"}, {$set:{'mension':'ED'}} )
//2
db.users.updateMany( {"ciclo" : "I CICLO" }, {$set:{'ciclo':'I'}});
db.users.updateMany( {"ciclo" : "III CICLO" }, {$set:{'ciclo':'III'}});
db.users.updateMany( {"ciclo" : "V CICLO" }, {$set:{'ciclo':'V'}});
db.users.updateMany( {"ciclo" : "VII CICLO" }, {$set:{'ciclo':'VII'}});
db.users.updateMany({codigo:"AFPTE417",year:"2023",title:"Retrato I"}, {$set:{'codigo':'AFPRE409'}});
...5
db.averages.find({codigo:"AFPTE417",year:"2023",title:"Retrato I"}).pretty()
//4
db.averages.updateMany( {"title" : "Ecosistema" }, {$set:{'title':'Ecosistema	'}} );
db.averages.updateMany( {"title" : "Fundamentos Visuales III" }, {$set:{'title':'Fundamentos Visuales III	'}} );
db.averages.updateMany( {"title" : "Comunicación Visual I" }, {$set:{'title':'Comunicación Visual	'}} );
db.averages.updateMany( {"title" : "Historia del Arte II" }, {$set:{'title':'Historia del Arte II	'}} );
db.averages.updateMany( {"title" : "Psicologia del Arte" }, {$set:{'title':'Psicología del Arte'}} );
db.averages.updateMany( {"title" : "Geometria Descriptiva" }, {$set:{'title':'Geometría Descriptiva I	'}} );
db.averages.updateMany( {"title" : "Taller Principal III - Grabado y Diseño Gráfico" }, {$set:{'title':'Taller Principal III (PEG)	'}} );
db.averages.updateMany( {"title" : "Dibujo III" }, {$set:{'title':'Dibujo III'}} );
...


db.averages.updateMany( {"title" : 'Metodos Estudios Superiores' }, {$set:{'title':'Métodos de Estudios Superiores'}} );
db.averages.updateMany( {"title" : 'Tecnologia de los Materiales' }, {$set:{'title':'Tecnología de los Materiales'}} );
db.averages.updateMany( {"title" : 'Morfologia Visual I' }, {$set:{'title':'Morfología Visual I'}} );
db.averages.updateMany( {"title" : '' }, {$set:{'title':''}} );
db.averages.updateMany( {"title" : '' }, {$set:{'title':''}} );
db.averages.updateMany( {"title" : '' }, {$set:{'title':''}} );


Ecosistema
Fundamentos Visuales III
Comunicación Visual
Historia del Arte II
Psicología del Arte
Geometría Descriptiva I
Taller Principal III (PEG)
Dibujo III

Ecosistema
Fundamentos Visuales III
Comunicación Visual I
Historia del Arte II
Psicología del Arte
Geometria Descriptiva
Taller Principal III - Grabado y Diseño Gráfico
Dibujo III





//3
db.cursesources.insertMany(
[ 
{ciclo:"I", mension:"AP", mencion:"G", codigo:"FGCOM101", title:"Comunicación I", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"I", mension:"AP", mencion:"G", codigo:"FGMAA103", title:"Matemática Aplicada al Arte", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"I", mension:"AP", mencion:"G", codigo:"FGMES105", title:"Métodos de Estudios Superiores", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"I", mension:"AP", mencion:"G", codigo:"CATMA107", title:"Tecnología de los Materiales I", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"I", mension:"AP", mencion:"G", codigo:"CAFVI109", title:"Fundamentos Visuales I", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"I", mension:"AP", mencion:"G", codigo:"CAMVI111", title:"Morfología Visual I", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"I", mension:"AP", mencion:"G", codigo:"FETAP113", title:"Taller Principal I (PEG)", teoria:"2", practica:"8", credito:"3", requisito: "No tiene"},
{ciclo:"I", mension:"AP", mencion:"G", codigo:"FEDIB115", title:"Dibujo I", teoria:"2", practica:"6", credito:"5", requisito: "No tiene"},
{ciclo:"I", mension:"AP", mencion:"G", codigo:"ESFA01", title:"Taller Principal Diseño Gráfico I", teoria:"2", practica:"8", credito:"3", requisito: "Ninguno"},
{ciclo:"II", mension:"AP", mencion:"G", codigo:"FGCOM102", title:"Comunicación II", teoria:"2", practica:"0", credito:"2", requisito: "Comunicación I"},
{ciclo:"II", mension:"AP", mencion:"G", codigo:"FGAIN104", title:"Arte e Interculturalidad", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"II", mension:"AP", mencion:"G", codigo:"CATMA108", title:"Tecnología de los Materiales II", teoria:"2", practica:"0", credito:"2", requisito: "Tecnolo. de los Materi. I"},
{ciclo:"II", mension:"AP", mencion:"G", codigo:"CAFVI110", title:"Fundamentos Visuales II", teoria:"2", practica:"0", credito:"2", requisito: "Fundamentos Visuales I"},
{ciclo:"II", mension:"AP", mencion:"G", codigo:"CAMVI112", title:"Morfología Visual II", teoria:"2", practica:"0", credito:"2", requisito: "Morfología Visual I"},
{ciclo:"II", mension:"AP", mencion:"G", codigo:"CAHAR114", title:"Historia del Arte I", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"II", mension:"AP", mencion:"G", codigo:"FETAP114", title:"Taller Principal II (PEG)", teoria:"2", practica:"8", credito:"3", requisito: "Taller Principal I (PEG)"},
{ciclo:"II", mension:"AP", mencion:"G", codigo:"FEDIB116", title:"Dibujo II", teoria:"2", practica:"6", credito:"5", requisito: "Dibujo I"},
{ciclo:"II", mension:"AP", mencion:"G", codigo:"ESFA02", title:"Taller Principal Diseño Gráfico II", teoria:"2", practica:"8", credito:"3", requisito: "Taller Principal Diseño Gráfico I"},
{ciclo:"III", mension:"AP", mencion:"G", codigo:"FMECO201", title:"Ecosistema", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"III", mension:"AP", mencion:"G", codigo:"CAFVI203", title:"Fundamentos Visuales III", teoria:"2", practica:"0", credito:"2", requisito: "Fundamentos Visuales II"},
{ciclo:"III", mension:"AP", mencion:"G", codigo:"CACVI205", title:"Comunicación Visual", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"III", mension:"AP", mencion:"G", codigo:"CAHAR207", title:"Historia del Arte II", teoria:"2", practica:"0", credito:"2", requisito: "Historia del Arte I"},
{ciclo:"III", mension:"AP", mencion:"G", codigo:"CAPÀR209", title:"Psicología del Arte", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"III", mension:"AP", mencion:"G", codigo:"CAGDE211", title:"Geometría Descriptiva I", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"III", mension:"AP", mencion:"G", codigo:"FETAP213", title:"Taller Principal III (PEG)", teoria:"2", practica:"8", credito:"3", requisito: "Taller Principal II (PEG)"},
{ciclo:"III", mension:"AP", mencion:"G", codigo:"FEDIB215", title:"Dibujo III", teoria:"2", practica:"6", credito:"5", requisito: "Dibujo II"},
{ciclo:"III", mension:"AP", mencion:"G", codigo:"ESFA03", title:"Taller Principal Diseño Gráfico III", teoria:"2", practica:"8", credito:"3", requisito: "Taller Principal Diseño Gráfico II"},
{ciclo:"IV", mension:"AP", mencion:"G", codigo:"CAFVI204", title:"Fundamentos Visuales IV", teoria:"2", practica:"0", credito:"2", requisito: "Fundamentos Visuales III"},
{ciclo:"IV", mension:"AP", mencion:"G", codigo:"CAAAR206", title:"Anatomía Artística I", teoria:"2", practica:"0", credito:"2", requisito: "Morfología Visual II"},
{ciclo:"IV", mension:"AP", mencion:"G", codigo:"CAHAR208", title:"Historia del Arte III", teoria:"2", practica:"0", credito:"2", requisito: "Historia del Arte II"},
{ciclo:"IV", mension:"AP", mencion:"G", codigo:"CAEAR210", title:"Estética del Arte", teoria:"2", practica:"0", credito:"2", requisito: "Psicología del Arte"},
{ciclo:"IV", mension:"AP", mencion:"G", codigo:"CAGDE212", title:"Geometría Descriptiva II", teoria:"2", practica:"0", credito:"2", requisito: "Geometría Descriptiva I"},
{ciclo:"IV", mension:"AP", mencion:"G", codigo:"FETAP214", title:"Taller Principal IV (PEG)", teoria:"2", practica:"8", credito:"3", requisito: "Taller Principal III (PEG)"},
{ciclo:"IV", mension:"AP", mencion:"G", codigo:"FEDIB216", title:"Dibujo IV", teoria:"2", practica:"6", credito:"5", requisito: "Dibujo III"},
{ciclo:"IV", mension:"AP", mencion:"G", codigo:"FEDIA218", title:"Diseño Artístico", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"IV", mension:"AP", mencion:"G", codigo:"ESFA04", title:"Taller Principal Diseño Gráfico IV", teoria:"2", practica:"4", credito:"3", requisito: "Taller Principal Diseño Gráfico III"},
{ciclo:"V", mension:"AP", mencion:"G", codigo:"CASAR301", title:"Semiótica del Arte", teoria:"2", practica:"0", credito:"2", requisito: "Comunicación Visual"},
{ciclo:"V", mension:"AP", mencion:"G", codigo:"CAAAR303", title:"Anatomía Artística II", teoria:"2", practica:"0", credito:"2", requisito: "Anatomía Artística I"},
{ciclo:"V", mension:"AP", mencion:"G", codigo:"CAHAR305", title:"Historia del Arte IV", teoria:"2", practica:"0", credito:"2", requisito: "Historia del Arte III"},
{ciclo:"V", mension:"AP", mencion:"G", codigo:"CAFAR307", title:"Filosofía del Arte", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"V", mension:"AP", mencion:"G", codigo:"CAFOR309", title:"Fotografía Artística I", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"V", mension:"AP", mencion:"G", codigo:"FETAP311", title:"Taller Principal V (PEG)", teoria:"2", practica:"8", credito:"3", requisito: "Taller Principal IV (PEG)"},
{ciclo:"V", mension:"AP", mencion:"G", codigo:"FEDIB313", title:"Dibujo V", teoria:"2", practica:"6", credito:"5", requisito: "Dibujo IV"},
{ciclo:"V", mension:"AP", mencion:"G", codigo:"FEDAD315", title:"Diseño Artístico Digital I", teoria:"2", practica:"0", credito:"2", requisito: "Diseño Artístico"},
{ciclo:"V", mension:"AP", mencion:"G", codigo:"ESFA05", title:"Taller Principal Diseño Gráfico V", teoria:"2", practica:"8", credito:"3", requisito: "Taller Principal Diseño Gráfico IV"},
{ciclo:"VI", mension:"AP", mencion:"G", codigo:"CAHAR306", title:"Historia del Arte V", teoria:"2", practica:"0", credito:"2", requisito: "Historia del Arte IV"},
{ciclo:"VI", mension:"AP", mencion:"G", codigo:"CASAR308", title:"Sociología del Arte", teoria:"2", practica:"0", credito:"2", requisito: "Filosofía del Arte"},
{ciclo:"VI", mension:"AP", mencion:"G", codigo:"CAFOR310", title:"Fotografía Artística II", teoria:"2", practica:"0", credito:"2", requisito: "Fotografía Artística I"},
{ciclo:"VI", mension:"AP", mencion:"G", codigo:"FETAP312", title:"Taller Principal VI (PEG)", teoria:"2", practica:"8", credito:"3", requisito: "Taller Principal V (PEG)"},
{ciclo:"VI", mension:"AP", mencion:"G", codigo:"FEDIB314", title:"Dibujo VI", teoria:"2", practica:"6", credito:"5", requisito: "Dibujo V"},
{ciclo:"VI", mension:"AP", mencion:"G", codigo:"FEDAD316", title:"Diseño Artístico Digital II", teoria:"2", practica:"0", credito:"2", requisito: "Diseño Artístico Digital I"},
{ciclo:"VI", mension:"AP", mencion:"G", codigo:"FECER318", title:"Cerámica I", teoria:"4", practica:"0", credito:"4", requisito: "No tiene"},
{ciclo:"VI", mension:"AP", mencion:"G", codigo:"ESFA06", title:"Taller Principal Diseño Gráfico VI", teoria:"2", practica:"8", credito:"3", requisito: "Taller Principal Diseño Gráfico V"},
{ciclo:"VII", mension:"AP", mencion:"G", codigo:"CAHAR401", title:"Historia del Arte VI", teoria:"2", practica:"0", credito:"2", requisito: "Historia del Arte V"},
{ciclo:"VII", mension:"AP", mencion:"G", codigo:"CACRA403", title:"Crítica del Arte", teoria:"2", practica:"0", credito:"2", requisito: "Estética del Arte"},
{ciclo:"VII", mension:"AP", mencion:"G", codigo:"FETAP405", title:"Taller Principal VII", teoria:"2", practica:"8", credito:"3", requisito: "Taller Principal VI (PEG)"},
{ciclo:"VII", mension:"AP", mencion:"G", codigo:"FEDIB407", title:"Dibujo VII", teoria:"2", practica:"6", credito:"5", requisito: "Dibujo VI"},
{ciclo:"VII", mension:"AP", mencion:"G", codigo:"FEAVI409", title:"Arte Virtual", teoria:"2", practica:"0", credito:"2", requisito: "Diseño Artístico Digital II"},
{ciclo:"VII", mension:"AP", mencion:"G", codigo:"FEINA411", title:"Investigación Artística I", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"VII", mension:"AP", mencion:"G", codigo:"FECER413", title:"Cerámica II", teoria:"2", practica:"2", credito:"3", requisito: "Cerámica I"},
{ciclo:"VII", mension:"AP", mencion:"G", codigo:"ESFA07", title:"Taller Principal Diseño Gráfico VII", teoria:"2", practica:"8", credito:"3", requisito: "Taller Principal Diseño Gráfico VI"},
{ciclo:"VIII", mension:"AP", mencion:"G", codigo:"CAGEM404", title:"Gestión Empresarial", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"VIII", mension:"AP", mencion:"G", codigo:"FETAP406", title:"Taller Principal VIII (PEG)", teoria:"2", practica:"10", credito:"3", requisito: "Taller Principal VII (PEG)"},
{ciclo:"VIII", mension:"AP", mencion:"G", codigo:"FEDIB408", title:"Dibujo VIII", teoria:"2", practica:"6", credito:"5", requisito: "Dibujo VII"},
{ciclo:"VIII", mension:"AP", mencion:"G", codigo:"FESAD410", title:"Seminario Artístico Digital I", teoria:"4", practica:"0", credito:"4", requisito: "Arte Virtual"},
{ciclo:"VIII", mension:"AP", mencion:"G", codigo:"FEINA412", title:"Investigación Artística II", teoria:"2", practica:"0", credito:"2", requisito: "Investigación Artística I"},
{ciclo:"VIII", mension:"AP", mencion:"G", codigo:"FETCR416", title:"Taller de Conservación y RestauraciónI", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"VIII", mension:"AP", mencion:"G", codigo:"ESFA08", title:"Taller Principal Diseño Gráfico VIII", teoria:"2", practica:"8", credito:"4", requisito: "Taller Principal Diseño Gráfico VII"},
{ciclo:"IX", mension:"AP", mencion:"G", codigo:"CAPAC501", title:"Proyectos Artísticos Culturales", teoria:"2", practica:"0", credito:"2", requisito: "Gestión Empresarial"},
{ciclo:"IX", mension:"AP", mencion:"G", codigo:"FETAP503", title:"Taller Principal IX (PEG)", teoria:"0", practica:"14", credito:"3", requisito: "Taller Principal VIII (PEG)"},
{ciclo:"IX", mension:"AP", mencion:"G", codigo:"FESAD505", title:"Seminario Artístico Digital II", teoria:"4", practica:"0", credito:"4", requisito: "Seminario Artístico Digital I"},
{ciclo:"IX", mension:"AP", mencion:"G", codigo:"FEINA507", title:"Investigación Artística III", teoria:"2", practica:"2", credito:"3", requisito: "Investigación Artística II"},
{ciclo:"IX", mension:"AP", mencion:"G", codigo:"FETCR509", title:"Taller de Conservación y Restauración II", teoria:"0", practica:"2", credito:"1", requisito: "Taller de Conservación y Restauración I"},
{ciclo:"IX", mension:"AP", mencion:"G", codigo:"FEPPP511", title:"Práctica Pre Profesional I", teoria:"2", practica:"2", credito:"3", requisito: "No tiene"},
{ciclo:"IX", mension:"AP", mencion:"G", codigo:"ESFA09", title:"Taller Principal Diseño Gráfico IX", teoria:"2", practica:"14", credito:"4", requisito: "Taller Principal Diseño Gráfico VIII"},
{ciclo:"X", mension:"AP", mencion:"G", codigo:"FETAP504", title:"Taller Principal X (PEG)", teoria:"0", practica:"14", credito:"3", requisito: "Taller Principal IX (PEG)"},
{ciclo:"X", mension:"AP", mencion:"G", codigo:"FESAD506", title:"Seminario Artístico Digital III", teoria:"0", practica:"4", credito:"2", requisito: "Seminario Artístico Digital II"},
{ciclo:"X", mension:"AP", mencion:"G", codigo:"FEINA508", title:"Investigación Artística IV", teoria:"4", practica:"0", credito:"4", requisito: "Investigación Artística III"},
{ciclo:"X", mension:"AP", mencion:"G", codigo:"FETIA514", title:"Taller de Integración Artística", teoria:"2", practica:"2", credito:"3", requisito: "Cerámica II"},
{ciclo:"X", mension:"AP", mencion:"G", codigo:"FEPPP512", title:"Práctica Pre Profesional II", teoria:"0", practica:"4", credito:"2", requisito: "Práctica Pre Profesional I"},
{ciclo:"X", mension:"AP", mencion:"G", codigo:"ESFA10", title:"Taller Principal Diseño Gráfico X", teoria:"2", practica:"14", credito:"4", requisito: "Taller Principal Diseño Gráfico IX"},
{ciclo:"I", mension:"AP", mencion:"P", codigo:"FGCOM101", title:"Comunicación I", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"I", mension:"AP", mencion:"P", codigo:"FGMAA103", title:"Matemática Aplicada al Arte", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"I", mension:"AP", mencion:"P", codigo:"FGMES105", title:"Métodos de Estudios Superiores", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"I", mension:"AP", mencion:"P", codigo:"CATMA107", title:"Tecnología de los Materiales I", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"I", mension:"AP", mencion:"P", codigo:"CAFVI109", title:"Fundamentos Visuales I", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"I", mension:"AP", mencion:"P", codigo:"CAMVI111", title:"Morfología Visual I", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"I", mension:"AP", mencion:"P", codigo:"FETAP113", title:"Taller Principal I (PEG)", teoria:"2", practica:"8", credito:"6", requisito: "No tiene"},
{ciclo:"I", mension:"AP", mencion:"P", codigo:"FEDIB115", title:"Dibujo I", teoria:"2", practica:"6", credito:"5", requisito: "No tiene"},
{ciclo:"II", mension:"AP", mencion:"P", codigo:"FGCOM102", title:"Comunicación II", teoria:"2", practica:"0", credito:"2", requisito: "Comunicación I"},
{ciclo:"II", mension:"AP", mencion:"P", codigo:"FGAIN104", title:"Arte e Interculturalidad", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"II", mension:"AP", mencion:"P", codigo:"CATMA108", title:"Tecnología de los Materiales II", teoria:"2", practica:"0", credito:"2", requisito: "Tecnolo. de los Materi. I"},
{ciclo:"II", mension:"AP", mencion:"P", codigo:"CAFVI110", title:"Fundamentos Visuales II", teoria:"2", practica:"0", credito:"2", requisito: "Fundamentos Visuales I"},
{ciclo:"II", mension:"AP", mencion:"P", codigo:"CAMVI112", title:"Morfología Visual II", teoria:"2", practica:"0", credito:"2", requisito: "Morfología Visual I"},
{ciclo:"II", mension:"AP", mencion:"P", codigo:"CAHAR114", title:"Historia del Arte I", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"II", mension:"AP", mencion:"P", codigo:"FETAP114", title:"Taller Principal II (PEG)", teoria:"2", practica:"8", credito:"6", requisito: "Taller Principal I (PEG)"},
{ciclo:"II", mension:"AP", mencion:"P", codigo:"FEDIB116", title:"Dibujo II", teoria:"2", practica:"6", credito:"5", requisito: "Dibujo I"},
{ciclo:"III", mension:"AP", mencion:"P", codigo:"FMECO201", title:"Ecosistema", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"III", mension:"AP", mencion:"P", codigo:"CAFVI203", title:"Fundamentos Visuales III", teoria:"2", practica:"0", credito:"2", requisito: "Fundamentos Visuales II"},
{ciclo:"III", mension:"AP", mencion:"P", codigo:"CACVI205", title:"Comunicación Visual", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"III", mension:"AP", mencion:"P", codigo:"CAHAR207", title:"Historia del Arte II", teoria:"2", practica:"0", credito:"2", requisito: "Historia del Arte I"},
{ciclo:"III", mension:"AP", mencion:"P", codigo:"CAPÀR209", title:"Psicología del Arte", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"III", mension:"AP", mencion:"P", codigo:"CAGDE211", title:"Geometría Descriptiva I", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"III", mension:"AP", mencion:"P", codigo:"FETAP213", title:"Taller Principal III (PEG)", teoria:"2", practica:"8", credito:"6", requisito: "Taller Principal II (PEG)"},
{ciclo:"III", mension:"AP", mencion:"P", codigo:"FEDIB215", title:"Dibujo III", teoria:"2", practica:"6", credito:"5", requisito: "Dibujo II"},
{ciclo:"IV", mension:"AP", mencion:"P", codigo:"CAFVI204", title:"Fundamentos Visuales IV", teoria:"2", practica:"0", credito:"2", requisito: "Fundamentos Visuales III"},
{ciclo:"IV", mension:"AP", mencion:"P", codigo:"CAAAR206", title:"Anatomía Artística I", teoria:"2", practica:"0", credito:"2", requisito: "Morfología Visual II"},
{ciclo:"IV", mension:"AP", mencion:"P", codigo:"CAHAR208", title:"Historia del Arte III", teoria:"2", practica:"0", credito:"2", requisito: "Historia del Arte II"},
{ciclo:"IV", mension:"AP", mencion:"P", codigo:"CAEAR210", title:"Estética del Arte", teoria:"2", practica:"0", credito:"2", requisito: "Psicología del Arte"},
{ciclo:"IV", mension:"AP", mencion:"P", codigo:"CAGDE212", title:"Geometría Descriptiva II", teoria:"2", practica:"0", credito:"2", requisito: "Geometría Descriptiva I"},
{ciclo:"IV", mension:"AP", mencion:"P", codigo:"FETAP214", title:"Taller Principal IV (PEG)", teoria:"2", practica:"8", credito:"6", requisito: "Taller Principal III (PEG)"},
{ciclo:"IV", mension:"AP", mencion:"P", codigo:"FEDIB216", title:"Dibujo IV", teoria:"2", practica:"6", credito:"5", requisito: "Dibujo III"},
{ciclo:"IV", mension:"AP", mencion:"P", codigo:"FEDIA218", title:"Diseño Artístico", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"V", mension:"AP", mencion:"P", codigo:"CASAR301", title:"Semiótica del Arte", teoria:"2", practica:"0", credito:"2", requisito: "Comunicación Visual"},
{ciclo:"V", mension:"AP", mencion:"P", codigo:"CAAAR303", title:"Anatomía Artística II", teoria:"2", practica:"0", credito:"2", requisito: "Anatomía Artística I"},
{ciclo:"V", mension:"AP", mencion:"P", codigo:"CAHAR305", title:"Historia del Arte IV", teoria:"2", practica:"0", credito:"2", requisito: "Historia del Arte III"},
{ciclo:"V", mension:"AP", mencion:"P", codigo:"CAFAR307", title:"Filosofía del Arte", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"V", mension:"AP", mencion:"P", codigo:"CAFOR309", title:"Fotografía Artística I", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"V", mension:"AP", mencion:"P", codigo:"FETAP311", title:"Taller Principal V (PEG)", teoria:"2", practica:"8", credito:"6", requisito: "Taller Principal IV (PEG)"},
{ciclo:"V", mension:"AP", mencion:"P", codigo:"FEDIB313", title:"Dibujo V", teoria:"2", practica:"6", credito:"5", requisito: "Dibujo IV"},
{ciclo:"V", mension:"AP", mencion:"P", codigo:"FEDAD315", title:"Diseño Artístico Digital I", teoria:"2", practica:"0", credito:"2", requisito: "Diseño Artístico"},
{ciclo:"VI", mension:"AP", mencion:"P", codigo:"CAHAR306", title:"Historia del Arte V", teoria:"2", practica:"0", credito:"2", requisito: "Historia del Arte IV"},
{ciclo:"VI", mension:"AP", mencion:"P", codigo:"CASAR308", title:"Sociología del Arte", teoria:"2", practica:"0", credito:"2", requisito: "Filosofía del Arte"},
{ciclo:"VI", mension:"AP", mencion:"P", codigo:"CAFOR310", title:"Fotografía Artística II", teoria:"2", practica:"0", credito:"2", requisito: "Fotografía Artística I"},
{ciclo:"VI", mension:"AP", mencion:"P", codigo:"FETAP312", title:"Taller Principal VI (PEG)", teoria:"2", practica:"8", credito:"6", requisito: "Taller Principal V (PEG)"},
{ciclo:"VI", mension:"AP", mencion:"P", codigo:"FEDIB314", title:"Dibujo VI", teoria:"2", practica:"6", credito:"5", requisito: "Dibujo V"},
{ciclo:"VI", mension:"AP", mencion:"P", codigo:"FEDAD316", title:"Diseño Artístico Digital II", teoria:"2", practica:"0", credito:"2", requisito: "Diseño Artístico Digital I"},
{ciclo:"VI", mension:"AP", mencion:"P", codigo:"FECER318", title:"Cerámica I", teoria:"4", practica:"0", credito:"4", requisito: "No tiene"},
{ciclo:"VII", mension:"AP", mencion:"P", codigo:"CAHAR401", title:"Historia del Arte VI", teoria:"2", practica:"0", credito:"2", requisito: "Historia del Arte V"},
{ciclo:"VII", mension:"AP", mencion:"P", codigo:"CACRA403", title:"Crítica del Arte", teoria:"2", practica:"0", credito:"2", requisito: "Estética del Arte"},
{ciclo:"VII", mension:"AP", mencion:"P", codigo:"FETAP405", title:"Taller Principal VII", teoria:"2", practica:"8", credito:"6", requisito: "Taller Principal VI (PEG)"},
{ciclo:"VII", mension:"AP", mencion:"P", codigo:"FEDIB407", title:"Dibujo VII", teoria:"2", practica:"6", credito:"5", requisito: "Dibujo VI"},
{ciclo:"VII", mension:"AP", mencion:"P", codigo:"FEAVI409", title:"Arte Virtual", teoria:"2", practica:"0", credito:"2", requisito: "Diseño Artístico Digital II"},
{ciclo:"VII", mension:"AP", mencion:"P", codigo:"FEINA411", title:"Investigación Artística I", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"VII", mension:"AP", mencion:"P", codigo:"FECER413", title:"Cerámica II", teoria:"2", practica:"2", credito:"3", requisito: "Cerámica I"},
{ciclo:"VIII", mension:"AP", mencion:"P", codigo:"CAGEM404", title:"Gestión Empresarial", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"VIII", mension:"AP", mencion:"P", codigo:"FETAP406", title:"Taller Principal VIII (PEG)", teoria:"2", practica:"10", credito:"7", requisito: "Taller Principal VII (PEG)"},
{ciclo:"VIII", mension:"AP", mencion:"P", codigo:"FEDIB408", title:"Dibujo VIII", teoria:"2", practica:"6", credito:"5", requisito: "Dibujo VII"},
{ciclo:"VIII", mension:"AP", mencion:"P", codigo:"FESAD410", title:"Seminario Artístico Digital I", teoria:"4", practica:"0", credito:"4", requisito: "Arte Virtual"},
{ciclo:"VIII", mension:"AP", mencion:"P", codigo:"FEINA412", title:"Investigación Artística II", teoria:"2", practica:"0", credito:"2", requisito: "Investigación Artística I"},
{ciclo:"VIII", mension:"AP", mencion:"P", codigo:"FETCR416", title:"Taller de Conservación y RestauraciónI", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"IX", mension:"AP", mencion:"P", codigo:"CAPAC501", title:"Proyectos Artísticos Culturales", teoria:"2", practica:"0", credito:"2", requisito: "Gestión Empresarial"},
{ciclo:"IX", mension:"AP", mencion:"P", codigo:"FETAP503", title:"Taller Principal IX (PEG)", teoria:"0", practica:"14", credito:"7", requisito: "Taller Principal VIII (PEG)"},
{ciclo:"IX", mension:"AP", mencion:"P", codigo:"FESAD505", title:"Seminario Artístico Digital II", teoria:"4", practica:"0", credito:"4", requisito: "Seminario Artístico Digital I"},
{ciclo:"IX", mension:"AP", mencion:"P", codigo:"FEINA507", title:"Investigación Artística III", teoria:"2", practica:"2", credito:"3", requisito: "Investigación Artística II"},
{ciclo:"IX", mension:"AP", mencion:"P", codigo:"FETCR509", title:"Taller de Conservación y Restauración II", teoria:"0", practica:"2", credito:"1", requisito: "Taller de Conservación y Restauración I"},
{ciclo:"IX", mension:"AP", mencion:"P", codigo:"FEPPP511", title:"Práctica Pre Profesional I", teoria:"2", practica:"2", credito:"3", requisito: "No tiene"},
{ciclo:"X", mension:"AP", mencion:"P", codigo:"FETAP504", title:"Taller Principal X (PEG)", teoria:"0", practica:"14", credito:"7", requisito: "Taller Principal IX (PEG)"},
{ciclo:"X", mension:"AP", mencion:"P", codigo:"FESAD506", title:"Seminario Artístico Digital III", teoria:"0", practica:"4", credito:"2", requisito: "Seminario Artístico Digital II"},
{ciclo:"X", mension:"AP", mencion:"P", codigo:"FEINA508", title:"Investigación Artística IV", teoria:"4", practica:"0", credito:"4", requisito: "Investigación Artística III"},
{ciclo:"X", mension:"AP", mencion:"P", codigo:"FETIA514", title:"Taller de Integración Artística", teoria:"2", practica:"2", credito:"3", requisito: "Cerámica II"},
{ciclo:"X", mension:"AP", mencion:"P", codigo:"FEPPP512", title:"Práctica Pre Profesional II", teoria:"0", practica:"4", credito:"2", requisito: "Práctica Pre Profesional I"},
{ciclo:"I", mension:"AP", mencion:"E", codigo:"FGCOM101", title:"Comunicación I", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"I", mension:"AP", mencion:"E", codigo:"FGMAA103", title:"Matemática Aplicada al Arte", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"I", mension:"AP", mencion:"E", codigo:"FGMES105", title:"Métodos de Estudios Superiores", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"I", mension:"AP", mencion:"E", codigo:"CATMA107", title:"Tecnología de los Materiales I", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"I", mension:"AP", mencion:"E", codigo:"CAFVI109", title:"Fundamentos Visuales I", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"I", mension:"AP", mencion:"E", codigo:"CAMVI111", title:"Morfología Visual I", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"I", mension:"AP", mencion:"E", codigo:"FETAP113", title:"Taller Principal I (PEG)", teoria:"2", practica:"8", credito:"6", requisito: "No tiene"},
{ciclo:"I", mension:"AP", mencion:"E", codigo:"FEDIB115", title:"Dibujo I", teoria:"2", practica:"6", credito:"5", requisito: "No tiene"},
{ciclo:"II", mension:"AP", mencion:"E", codigo:"FGCOM102", title:"Comunicación II", teoria:"2", practica:"0", credito:"2", requisito: "Comunicación I"},
{ciclo:"II", mension:"AP", mencion:"E", codigo:"FGAIN104", title:"Arte e Interculturalidad", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"II", mension:"AP", mencion:"E", codigo:"CATMA108", title:"Tecnología de los Materiales II", teoria:"2", practica:"0", credito:"2", requisito: "Tecnolo. de los Materi. I"},
{ciclo:"II", mension:"AP", mencion:"E", codigo:"CAFVI110", title:"Fundamentos Visuales II", teoria:"2", practica:"0", credito:"2", requisito: "Fundamentos Visuales I"},
{ciclo:"II", mension:"AP", mencion:"E", codigo:"CAMVI112", title:"Morfología Visual II", teoria:"2", practica:"0", credito:"2", requisito: "Morfología Visual I"},
{ciclo:"II", mension:"AP", mencion:"E", codigo:"CAHAR114", title:"Historia del Arte I", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"II", mension:"AP", mencion:"E", codigo:"FETAP114", title:"Taller Principal II (PEG)", teoria:"2", practica:"8", credito:"6", requisito: "Taller Principal I (PEG)"},
{ciclo:"II", mension:"AP", mencion:"E", codigo:"FEDIB116", title:"Dibujo II", teoria:"2", practica:"6", credito:"5", requisito: "Dibujo I"},
{ciclo:"III", mension:"AP", mencion:"E", codigo:"FMECO201", title:"Ecosistema", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"III", mension:"AP", mencion:"E", codigo:"CAFVI203", title:"Fundamentos Visuales III", teoria:"2", practica:"0", credito:"2", requisito: "Fundamentos Visuales II"},
{ciclo:"III", mension:"AP", mencion:"E", codigo:"CACVI205", title:"Comunicación Visual", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"III", mension:"AP", mencion:"E", codigo:"CAHAR207", title:"Historia del Arte II", teoria:"2", practica:"0", credito:"2", requisito: "Historia del Arte I"},
{ciclo:"III", mension:"AP", mencion:"E", codigo:"CAPÀR209", title:"Psicología del Arte", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"III", mension:"AP", mencion:"E", codigo:"CAGDE211", title:"Geometría Descriptiva I", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"III", mension:"AP", mencion:"E", codigo:"FETAP213", title:"Taller Principal III (PEG)", teoria:"2", practica:"8", credito:"6", requisito: "Taller Principal II (PEG)"},
{ciclo:"III", mension:"AP", mencion:"E", codigo:"FEDIB215", title:"Dibujo III", teoria:"2", practica:"6", credito:"5", requisito: "Dibujo II"},
{ciclo:"IV", mension:"AP", mencion:"E", codigo:"CAFVI204", title:"Fundamentos Visuales IV", teoria:"2", practica:"0", credito:"2", requisito: "Fundamentos Visuales III"},
{ciclo:"IV", mension:"AP", mencion:"E", codigo:"CAAAR206", title:"Anatomía Artística I", teoria:"2", practica:"0", credito:"2", requisito: "Morfología Visual II"},
{ciclo:"IV", mension:"AP", mencion:"E", codigo:"CAHAR208", title:"Historia del Arte III", teoria:"2", practica:"0", credito:"2", requisito: "Historia del Arte II"},
{ciclo:"IV", mension:"AP", mencion:"E", codigo:"CAEAR210", title:"Estética del Arte", teoria:"2", practica:"0", credito:"2", requisito: "Psicología del Arte"},
{ciclo:"IV", mension:"AP", mencion:"E", codigo:"CAGDE212", title:"Geometría Descriptiva II", teoria:"2", practica:"0", credito:"2", requisito: "Geometría Descriptiva I"},
{ciclo:"IV", mension:"AP", mencion:"E", codigo:"FETAP214", title:"Taller Principal IV (PEG)", teoria:"2", practica:"8", credito:"6", requisito: "Taller Principal III (PEG)"},
{ciclo:"IV", mension:"AP", mencion:"E", codigo:"FEDIB216", title:"Dibujo IV", teoria:"2", practica:"6", credito:"5", requisito: "Dibujo III"},
{ciclo:"IV", mension:"AP", mencion:"E", codigo:"FEDIA218", title:"Diseño Artístico", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"V", mension:"AP", mencion:"E", codigo:"CASAR301", title:"Semiótica del Arte", teoria:"2", practica:"0", credito:"2", requisito: "Comunicación Visual"},
{ciclo:"V", mension:"AP", mencion:"E", codigo:"CAAAR303", title:"Anatomía Artística II", teoria:"2", practica:"0", credito:"2", requisito: "Anatomía Artística I"},
{ciclo:"V", mension:"AP", mencion:"E", codigo:"CAHAR305", title:"Historia del Arte IV", teoria:"2", practica:"0", credito:"2", requisito: "Historia del Arte III"},
{ciclo:"V", mension:"AP", mencion:"E", codigo:"CAFAR307", title:"Filosofía del Arte", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"V", mension:"AP", mencion:"E", codigo:"CAFOR309", title:"Fotografía Artística I", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"V", mension:"AP", mencion:"E", codigo:"FETAP311", title:"Taller Principal V (PEG)", teoria:"2", practica:"8", credito:"6", requisito: "Taller Principal IV (PEG)"},
{ciclo:"V", mension:"AP", mencion:"E", codigo:"FEDIB313", title:"Dibujo V", teoria:"2", practica:"6", credito:"5", requisito: "Dibujo IV"},
{ciclo:"V", mension:"AP", mencion:"E", codigo:"FEDAD315", title:"Diseño Artístico Digital I", teoria:"2", practica:"0", credito:"2", requisito: "Diseño Artístico"},
{ciclo:"VI", mension:"AP", mencion:"E", codigo:"CAHAR306", title:"Historia del Arte V", teoria:"2", practica:"0", credito:"2", requisito: "Historia del Arte IV"},
{ciclo:"VI", mension:"AP", mencion:"E", codigo:"CASAR308", title:"Sociología del Arte", teoria:"2", practica:"0", credito:"2", requisito: "Filosofía del Arte"},
{ciclo:"VI", mension:"AP", mencion:"E", codigo:"CAFOR310", title:"Fotografía Artística II", teoria:"2", practica:"0", credito:"2", requisito: "Fotografía Artística I"},
{ciclo:"VI", mension:"AP", mencion:"E", codigo:"FETAP312", title:"Taller Principal VI (PEG)", teoria:"2", practica:"8", credito:"6", requisito: "Taller Principal V (PEG)"},
{ciclo:"VI", mension:"AP", mencion:"E", codigo:"FEDIB314", title:"Dibujo VI", teoria:"2", practica:"6", credito:"5", requisito: "Dibujo V"},
{ciclo:"VI", mension:"AP", mencion:"E", codigo:"FEDAD316", title:"Diseño Artístico Digital II", teoria:"2", practica:"0", credito:"2", requisito: "Diseño Artístico Digital I"},
{ciclo:"VI", mension:"AP", mencion:"E", codigo:"FECER318", title:"Cerámica I", teoria:"4", practica:"0", credito:"4", requisito: "No tiene"},
{ciclo:"VII", mension:"AP", mencion:"E", codigo:"CAHAR401", title:"Historia del Arte VI", teoria:"2", practica:"0", credito:"2", requisito: "Historia del Arte V"},
{ciclo:"VII", mension:"AP", mencion:"E", codigo:"CACRA403", title:"Crítica del Arte", teoria:"2", practica:"0", credito:"2", requisito: "Estética del Arte"},
{ciclo:"VII", mension:"AP", mencion:"E", codigo:"FETAP405", title:"Taller Principal VII", teoria:"2", practica:"8", credito:"6", requisito: "Taller Principal VI (PEG)"},
{ciclo:"VII", mension:"AP", mencion:"E", codigo:"FEDIB407", title:"Dibujo VII", teoria:"2", practica:"6", credito:"5", requisito: "Dibujo VI"},
{ciclo:"VII", mension:"AP", mencion:"E", codigo:"FEAVI409", title:"Arte Virtual", teoria:"2", practica:"0", credito:"2", requisito: "Diseño Artístico Digital II"},
{ciclo:"VII", mension:"AP", mencion:"E", codigo:"FEINA411", title:"Investigación Artística I", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"VII", mension:"AP", mencion:"E", codigo:"FECER413", title:"Cerámica II", teoria:"2", practica:"2", credito:"3", requisito: "Cerámica I"},
{ciclo:"VIII", mension:"AP", mencion:"E", codigo:"CAGEM404", title:"Gestión Empresarial", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"VIII", mension:"AP", mencion:"E", codigo:"FETAP406", title:"Taller Principal VIII (PEG)", teoria:"2", practica:"10", credito:"7", requisito: "Taller Principal VII (PEG)"},
{ciclo:"VIII", mension:"AP", mencion:"E", codigo:"FEDIB408", title:"Dibujo VIII", teoria:"2", practica:"6", credito:"5", requisito: "Dibujo VII"},
{ciclo:"VIII", mension:"AP", mencion:"E", codigo:"FESAD410", title:"Seminario Artístico Digital I", teoria:"4", practica:"0", credito:"4", requisito: "Arte Virtual"},
{ciclo:"VIII", mension:"AP", mencion:"E", codigo:"FEINA412", title:"Investigación Artística II", teoria:"2", practica:"0", credito:"2", requisito: "Investigación Artística I"},
{ciclo:"VIII", mension:"AP", mencion:"E", codigo:"FETCR416", title:"Taller de Conservación y RestauraciónI", teoria:"2", practica:"0", credito:"2", requisito: "No tiene"},
{ciclo:"IX", mension:"AP", mencion:"E", codigo:"CAPAC501", title:"Proyectos Artísticos Culturales", teoria:"2", practica:"0", credito:"2", requisito: "Gestión Empresarial"},
{ciclo:"IX", mension:"AP", mencion:"E", codigo:"FETAP503", title:"Taller Principal IX (PEG)", teoria:"0", practica:"14", credito:"7", requisito: "Taller Principal VIII (PEG)"},
{ciclo:"IX", mension:"AP", mencion:"E", codigo:"FESAD505", title:"Seminario Artístico Digital II", teoria:"4", practica:"0", credito:"4", requisito: "Seminario Artístico Digital I"},
{ciclo:"IX", mension:"AP", mencion:"E", codigo:"FEINA507", title:"Investigación Artística III", teoria:"2", practica:"2", credito:"3", requisito: "Investigación Artística II"},
{ciclo:"IX", mension:"AP", mencion:"E", codigo:"FETCR509", title:"Taller de Conservación y Restauración II", teoria:"0", practica:"2", credito:"1", requisito: "Taller de Conservación y Restauración I"},
{ciclo:"IX", mension:"AP", mencion:"E", codigo:"FEPPP511", title:"Práctica Pre Profesional I", teoria:"2", practica:"2", credito:"3", requisito: "No tiene"},
{ciclo:"X", mension:"AP", mencion:"E", codigo:"FETAP504", title:"Taller Principal X (PEG)", teoria:"0", practica:"14", credito:"7", requisito: "Taller Principal IX (PEG)"},
{ciclo:"X", mension:"AP", mencion:"E", codigo:"FESAD506", title:"Seminario Artístico Digital III", teoria:"0", practica:"4", credito:"2", requisito: "Seminario Artístico Digital II"},
{ciclo:"X", mension:"AP", mencion:"E", codigo:"FEINA508", title:"Investigación Artística IV", teoria:"4", practica:"0", credito:"4", requisito: "Investigación Artística III"},
{ciclo:"X", mension:"AP", mencion:"E", codigo:"FETIA514", title:"Taller de Integración Artística", teoria:"2", practica:"2", credito:"3", requisito: "Cerámica II"},
{ciclo:"X", mension:"AP", mencion:"E", codigo:"FEPPP512", title:"Práctica Pre Profesional II", teoria:"0", practica:"4", credito:"2", requisito: "Práctica Pre Profesional I"},
{ciclo:"I", mension:"EA", mencion:"ED", codigo :"ABCOM101", title:"Comunicación I", teoria:"4", practica:"0", credito:"4", requisito:"No tiene"},
{ciclo:"I", mension:"EA", mencion:"ED", codigo :"ABMES103", title:"Métodos de Estudios Superiores", teoria:"4", practica:"0", credito:"4", requisito:"No tiene"},
{ciclo:"I", mension:"EA", mencion:"ED", codigo :"AFPDI107", title:"Dibujo I", teoria:"2", practica:"2", credito:"3", requisito:"No tiene"},
{ciclo:"I", mension:"EA", mencion:"ED", codigo :"AFPPI109", title:"Pintura I", teoria:"2", practica:"4", credito:"4", requisito:"No tiene"},
{ciclo:"I", mension:"EA", mencion:"ED", codigo :"AFPES111", title:"Escultura I", teoria:"2", practica:"4", credito:"4", requisito:"No tiene"},
{ciclo:"I", mension:"EA", mencion:"ED", codigo :"AFPPE113", title:"Perspectiva", teoria:"2", practica:"0", credito:"2", requisito:"No tiene"},
{ciclo:"I", mension:"EA", mencion:"ED", codigo :"AFPEE115", title:"Elementos Estéticos I", teoria:"2", practica:"0", credito:"2", requisito:"No tiene"},
{ciclo:"I", mension:"EA", mencion:"ED", codigo :"AFPMV117", title:"Morfología Visual", teoria:"2", practica:"0", credito:"2", requisito:"No tiene"},
{ciclo:"II", mension:"EA", mencion:"ED", codigo :"ABCOM102", title:"Comunicación II", teoria:"2", practica:"2", credito:"3", requisito:"Comunicación I"},
{ciclo:"II", mension:"EA", mencion:"ED", codigo :"ABMEV104", title:"Métodos de Estudio Virtual", teoria:"2", practica:"0", credito:"2", requisito:"Mét. de Estu. Superiores"},
{ciclo:"II", mension:"EA", mencion:"ED", codigo :"AEDIA106", title:"Didáctica de las Artes I", teoria:"2", practica:"0", credito:"2", requisito:"No tiene"},
{ciclo:"II", mension:"EA", mencion:"ED", codigo :"AFPDI108", title:"Dibujo II", teoria:"2", practica:"2", credito:"3", requisito:"Dibujo I"},
{ciclo:"II", mension:"EA", mencion:"ED", codigo :"AFPPI110", title:"Pintura II", teoria:"2", practica:"4", credito:"4", requisito:"Pintura I"},
{ciclo:"II", mension:"EA", mencion:"ED", codigo :"AFPES112", title:"Escultura II", teoria:"2", practica:"4", credito:"4", requisito:"Escultura I"},
{ciclo:"II", mension:"EA", mencion:"ED", codigo :"AFPEE116", title:"Elementos Estéticos II", teoria:"4", practica:"0", credito:"4", requisito:"Elementos Estéticos I"},
{ciclo:"II", mension:"EA", mencion:"ED", codigo :"AFPAA118", title:"Anatomía Artística", teoria:"2", practica:"0", credito:"2", requisito:"Morfología Visual"},
{ciclo:"III", mension:"EA", mencion:"ED", codigo :"ABMAT201", title:"Matemática I", teoria:"2", practica:"0", credito:"2", requisito:"No tiene"},
{ciclo:"III", mension:"EA", mencion:"ED", codigo :"ABSOC203", title:"Sociedad I", teoria:"3", practica:"0", credito:"3", requisito:"No tiene"},
{ciclo:"III", mension:"EA", mencion:"ED", codigo :"AEDIA205", title:"Didáctica de las Artes II", teoria:"2", practica:"0", credito:"2", requisito:"Didáctica de las Artes I"},
{ciclo:"III", mension:"EA", mencion:"ED", codigo :"AFPDI211", title:"Dibujo III", teoria:"2", practica:"2", credito:"3", requisito:"Dibujo II"},
{ciclo:"III", mension:"EA", mencion:"ED", codigo :"AFPPI213", title:"Pintura III", teoria:"2", practica:"4", credito:"4", requisito:"Pintura II"},
{ciclo:"III", mension:"EA", mencion:"ED", codigo :"AFPES215", title:"Escultura III", teoria:"2", practica:"4", credito:"4", requisito:"Escultura II"},
{ciclo:"III", mension:"EA", mencion:"ED", codigo :"AFPHA217", title:"Historia del Arte I", teoria:"3", practica:"0", credito:"3", requisito:"No tiene"},
{ciclo:"III", mension:"EA", mencion:"ED", codigo :"AFPDA219", title:"Diseño Artístico", teoria:"4", practica:"0", credito:"4", requisito:"Elementos Estéticos II"},
{ciclo:"IV", mension:"EA", mencion:"ED", codigo :"ABSOC204", title:"Sociedad II", teoria:"2", practica:"0", credito:"2", requisito:"Sociedad I"},
{ciclo:"IV", mension:"EA", mencion:"ED", codigo :"AEDIA206", title:"Didáctica de las Artes III", teoria:"2", practica:"0", credito:"2", requisito:"Didáctica de las Artes II"},
{ciclo:"IV", mension:"EA", mencion:"ED", codigo :"AETED208", title:"Teoría de la Educación I", teoria:"6", practica:"0", credito:"6", requisito:"No tiene"},
{ciclo:"IV", mension:"EA", mencion:"ED", codigo :"AEPSI210", title:"Psicología I", teoria:"2", practica:"0", credito:"2", requisito:"No tiene"},
{ciclo:"IV", mension:"EA", mencion:"ED", codigo :"AFPDI212", title:"Dibujo IV", teoria:"2", practica:"2", credito:"3", requisito:"Dibujo III"},
{ciclo:"IV", mension:"EA", mencion:"ED", codigo :"AFPPI214", title:"Pintura IV", teoria:"0", practica:"6", credito:"3", requisito:"Pintura III"},
{ciclo:"IV", mension:"EA", mencion:"ED", codigo :"AFPES216", title:"Escultura IV", teoria:"0", practica:"6", credito:"3", requisito:"Escultura III"},
{ciclo:"IV", mension:"EA", mencion:"ED", codigo :"AFPHA218", title:"Historia del Arte II", teoria:"2", practica:"0", credito:"2", requisito:"Historia del Arte I"},
{ciclo:"V", mension:"EA", mencion:"ED", codigo :"AEDIA307", title:"Didáctica de las Artes IV", teoria:"2", practica:"0", credito:"2", requisito:"Didáctica de las Artes III"},
{ciclo:"V", mension:"EA", mencion:"ED", codigo :"AETED309", title:"Teoría de la Educación II", teoria:"4", practica:"2", credito:"5", requisito:"Teoría de la Educación I"},
{ciclo:"V", mension:"EA", mencion:"ED", codigo :"AEPSI311", title:"Psicología II", teoria:"4", practica:"0", credito:"4", requisito:"Psicología I"},
{ciclo:"V", mension:"EA", mencion:"ED", codigo :"AFPDI313", title:"Dibujo V", teoria:"2", practica:"2", credito:"3", requisito:"Dibujo IV"},
{ciclo:"V", mension:"EA", mencion:"ED", codigo :"AFPTR315", title:"Taller Regional I", teoria:"0", practica:"6", credito:"3", requisito:"Pintura IV"},
{ciclo:"V", mension:"EA", mencion:"ED", codigo :"AFPGR317", title:"Grabado I", teoria:"0", practica:"6", credito:"3", requisito:"Escultura IV"},
{ciclo:"V", mension:"EA", mencion:"ED", codigo :"AFPHA319", title:"Historia del Arte III", teoria:"2", practica:"0", credito:"2", requisito:"Historia del Arte II"},
{ciclo:"VI", mension:"EA", mencion:"ED", codigo :"ABQUE302", title:"Quechua", teoria:"2", practica:"0", credito:"2", requisito:"No tiene"},
{ciclo:"VI", mension:"EA", mencion:"ED", codigo :"ABEIA304", title:"Educación Intercultural Artístico", teoria:"2", practica:"0", credito:"2", requisito:"Sociedad II"},
{ciclo:"VI", mension:"EA", mencion:"ED", codigo :"ABFIL306", title:"Filosofía I", teoria:"2", practica:"0", credito:"2", requisito:"No tiene"},
{ciclo:"VI", mension:"EA", mencion:"ED", codigo :"AECTG308", title:"Currículo Tecnología y Gestión I", teoria:"4", practica:"0", credito:"4", requisito:"No tiene"},
{ciclo:"VI", mension:"EA", mencion:"ED", codigo :"AFPDI314", title:"Dibujo VI", teoria:"0", practica:"4", credito:"2", requisito:"Dibujo V"},
{ciclo:"VI", mension:"EA", mencion:"ED", codigo :"AFPTR316", title:"Taller Regional II", teoria:"0", practica:"6", credito:"3", requisito:"Taller Regional I"},
{ciclo:"VI", mension:"EA", mencion:"ED", codigo :"AFPGR318", title:"Grabado II", teoria:"0", practica:"6", credito:"3", requisito:"Grabado I"},
{ciclo:"VI", mension:"EA", mencion:"ED", codigo :"AFPMU322", title:"Música I", teoria:"4", practica:"0", credito:"4", requisito:"No tiene"},
{ciclo:"VII", mension:"EA", mencion:"ED", codigo :"ABFIL403", title:"Filosofía II", teoria:"4", practica:"0", credito:"4", requisito:"Filosofía I"},
{ciclo:"VII", mension:"EA", mencion:"ED", codigo :"AECTG405", title:"Currículo Tecnología y Gestión II", teoria:"4", practica:"0", credito:"4", requisito:"Curríc. Tecn. y Gestión I"},
{ciclo:"VII", mension:"EA", mencion:"ED", codigo :"AFPRE409", title:"Retrato I", teoria:"0", practica:"2", credito:"1", requisito:"Taller Regional II"},
{ciclo:"VII", mension:"EA", mencion:"ED", codigo :"AFPGR411", title:"Grabado III", teoria:"0", practica:"6", credito:"3", requisito:"Grabado II"},
{ciclo:"VII", mension:"EA", mencion:"ED", codigo :"AFPCE413", title:"Cerámica I", teoria:"0", practica:"2", credito:"1", requisito:"No tiene"},
{ciclo:"VII", mension:"EA", mencion:"ED", codigo :"AFPMU415", title:"Música II", teoria:"0", practica:"4", credito:"2", requisito:"Música I"},
{ciclo:"VII", mension:"EA", mencion:"ED", codigo :"AFPTE417", title:"Teatro I", teoria:"0", practica:"4", credito:"2", requisito:"No tiene"},
{ciclo:"VII", mension:"EA", mencion:"ED", codigo :"AFPPP419", title:"Tutoría y Práctica Pedagógica I", teoria:"4", practica:"0", credito:"4", requisito:"No tiene"},
{ciclo:"VIII", mension:"EA", mencion:"ED", codigo :"ABEST402", title:"Estadística", teoria:"2", practica:"0", credito:"2", requisito:"Matemática"},
{ciclo:"VIII", mension:"EA", mencion:"ED", codigo :"AECTG406", title:"Currículo Tecnología y Gestión III", teoria:"4", practica:"0", credito:"4", requisito:"Curríc. Tecn. y Gestión II"},
{ciclo:"VIII", mension:"EA", mencion:"ED", codigo :"AEINV408", title:"Investigación I", teoria:"4", practica:"0", credito:"4", requisito:"Mét. de Estudio Virtual"},
{ciclo:"VIII", mension:"EA", mencion:"ED", codigo :"AFPRE410", title:"Retrato II", teoria:"0", practica:"2", credito:"1", requisito:"Retrato I"},
{ciclo:"VIII", mension:"EA", mencion:"ED", codigo :"AFPIA412", title:"Integración Artística I", teoria:"0", practica:"4", credito:"2", requisito:"Grabado III"},
{ciclo:"VIII", mension:"EA", mencion:"ED", codigo :"AFPCE414", title:"Cerámica II", teoria:"0", practica:"4", credito:"2", requisito:"Cerámica I"},
{ciclo:"VIII", mension:"EA", mencion:"ED", codigo :"AFPTE418", title:"Teatro II", teoria:"0", practica:"4", credito:"2", requisito:"Teatro I"},
{ciclo:"VIII", mension:"EA", mencion:"ED", codigo :"AFPPP420", title:"Tutoría y Práctica Pedagógica II", teoria:"0", practica:"6", credito:"3", requisito:"Tuto. y Práct. Pedagóg. I"},
{ciclo:"IX", mension:"EA", mencion:"ED", codigo :"AECTG501", title:"Currículo Tecnología y Gestión IV", teoria:"4", practica:"0", credito:"4", requisito:"Curríc. Tecn. y Gesti. III"},
{ciclo:"IX", mension:"EA", mencion:"ED", codigo :"AEINV503", title:"Investigación II", teoria:"6", practica:"0", credito:"6", requisito:"Investigación I"},
{ciclo:"IX", mension:"EA", mencion:"ED", codigo :"AFPIA412", title:"Integración Artística II", teoria:"0", practica:"4", credito:"2", requisito:"Integración Artística I"},
{ciclo:"IX", mension:"EA", mencion:"ED", codigo :"AFPDA507", title:"Danza I", teoria:"0", practica:"4", credito:"2", requisito:"Teatro II"},
{ciclo:"IX", mension:"EA", mencion:"ED", codigo :"AFPPP509", title:"Tutoría y Práctica Pedagógica III", teoria:"0", practica:"12", credito:"6", requisito:"Tuto. y Práct. Pedagóg. II"},
{ciclo:"X", mension:"EA", mencion:"ED", codigo :"AEINV504", title:"Investigación III", teoria:"6", practica:"0", credito:"6", requisito:"Investigación II"},
{ciclo:"X", mension:"EA", mencion:"ED", codigo :"AFPOA506", title:"Obra Artística", teoria:"0", practica:"4", credito:"2", requisito:"Integración Artística II"},
{ciclo:"X", mension:"EA", mencion:"ED", codigo :"AFPDA508", title:"Danza II", teoria:"0", practica:"4", credito:"2", requisito:"Danza I"},
{ciclo:"X", mension:"EA", mencion:"ED", codigo :"AFPPP510", title:"Tutoría y Práctica Pedagógica IV", teoria:"0", practica:"16", credito:"8", requisito:"Tuto. y Práct. Pedag. III"},
]);
 


db.cursesources.aggregate([
    {
      $match: {
        $and: [
          { ciclo: "III" },
          { mencion: "E" }
        ]
      }
    }
  ])


{
       $group:
         {
           _id: { day: { $dayOfYear: "$date"}, year: { $year: "$date" } },
           totalAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } },
           count: { $sum: 1 }
         }
     }

     { "_id" : { "day" : 46, "year" : 2014 }, "totalAmount" : 150, "count" : 2 }
     { "_id" : { "day" : 34, "year" : 2014 }, "totalAmount" : 45, "count" : 2 }
     { "_id" : { "day" : 1, "year" : 2014 }, "totalAmount" : 20, "count" : 1 }
     db.wwws.insertMany(
[
  {name:"75869653",email: "75869653@w",  size: { h: 14, w: 21, uom: "cm" }, password:"75869653",rol:"3",foto:"uploads/dni:"uploads/cf0802fd-d079-4eb4-bc60-e0d31ae7c939.jpg",createdAt:ISODate("2021-08-16T20:28:22.674Z"),updateAt:ISODate("2021-08-16T20:28:22.674Z")},
  {name:"75869653",email: "75869653@w", password:"75869653",rol:"3",foto:"uploads/dni:"uploads/cf0802fd-d079-4eb4-bc60-e0d31ae7c939.jpg",createdAt:ISODate("2021-08-16T20:28:22.674Z"),updateAt:ISODate("2021-08-16T20:28:22.674Z")}])
-//Actualizar e ingresar documentos nested

db.tasks.updateMany( {theme: ObjectId('65e25c9fa590c6fa0206d938')}, { '$set': {"datte" : ''} });

db.themes.updateMany( {_id: ObjectId('65e25c9fa590c6fa0206d938')}, { '$set': {"time" : '2024-03-12T23:57'} });

//Actualizar e ingresar documentos nuevos
db.wwws.update( {'_id':ObjectId('623bcd104e6f90b190a6d1d7')}, {$set:{'role':'New MongoDB Tutorial', 'rolewww':'New MongoDB Tutorial'}} )

//Actualizar y agregar campos nuevos a toda la collección
db.curses.updateMany( { }, {$set:{'ciclo':'V', 'credito':'3', 'especialidad':'G'}} )
db.averages.updateMany( { }, {$set:{'year':'2022' }})
//borrar un campo de todo los documentos
db.users.updateMany( { rol:"2" }, { $unset: { year: "" } })
---------------------
//Actualizar y aumentar campos
db.curses.update( { '_id':ObjectId('62dfeb1e3715ea8dcc8fcddf') }, {$set:{'name':'Comunicación I', 'number':'39', 'ciclo':'I', especialidad:"ED", credito:"4"}})

//insertar nuevo campo a toda la colleccion con dato en particular
db.curses.updateMany({}, {"$set": {"show": "false"}})

//insertar nuevo campo a algunos datos de la colleccion con un dato en particular
db.users.update( { 'carreramension':'EDUCACIÓN ARTÍSTICA' }, {$set:{'mension':'ED'}} )

//rename field
db.users.updateMany({}, {$rename:{"identificacion_nacional":"dni"}}, false, true)
db.curses.updateMany({}, {$rename:{"mension":"mencion"}}, false, true)

//eliminar un campo. Only one with ID
db.averages.updateMany({},{"$unset":{"year":1}});
db.averages.updateMany({},{"$unset":{"filosophy":1}});

db.wwws.update( {'_id':ObjectId('623bcd104e6f90b190a6d1d7')}, { $unset: { type: "" } } )
db.users.update( {'dni':'74217930'}, { $unset: { 'foto': "uploads/user/74217930.jpg" } } )

//borrar un campo de todo los documentos
db.wwws.updateMany( { }, { $unset: { type: "" } } )

//Remover collection
db.users.deletemany( {'curse':ObjectId('62fc1fadfecd2931bda289b5')} )

db.users.insertOne(
  {
    name: "Wwwwwww",
    email: "w@w",
    password: "w",
    foto: "",
    rol: "1",
  }
)

//descargar
mongodump --out w1.json --db fismart --host localhost
mongodump --out ww.json --db fgpa --host localhost
//subir
mongorestore --db fismart ww.json/fismart  
mongorestore --db fgpa ww.json/fgpa

mongodump --out w1.json --db fismart --collection wwws --host localhost
mongorestore --db namedatabase --collection namecollectionqueenviar w1.json/fisart //restaurar coleccion.

estudnaites mension y ciclo one date
db.users.updateMany({rol:"3"},{"$dni": {",{"$set": {"mension": "N", "ciclo":"N"}})



ED
1(35)
*2(39)
3(32)
4(40)
5(28)
AP (PGE)
*1(28 23 18)
2(29 17 4)
3(24 10 3)
4(26 10 0)
5(15 1 1)

db.averages.updateMany({codigo:"AFPHA218", ciclo:"IV", year:"2022",mencion:"ED"},{$set:{codigo:"CAHAR207"}})
db.averages.updateMany({codigo:"AFPIA412", ciclo:"VIII", year:"2022",mencion:"ED"},{$set:{codigo:"AFPIA412"}})
db.averages.updateMany({codigo:"FECER413", ciclo:"VIII", year:"2022",mencion:"ED"},{$set:{codigo:"AFPCE414"}})
db.averages.updateMany({codigo:"AFPCE413", ciclo:"VI", year:"2022",mencion:"E"},{$set:{codigo:"FECER318"}})


db.averages.updateMany({codigo:"AFPTE417", ciclo:"VII", year:"2023",mencion:"ED"},{$set:{codigo:"AFPRE409k"}})
db.averages.updateMany({codigo:"AFPRE409", ciclo:"VII", year:"2023",mencion:"ED"},{$set:{codigo:"AFPTE417"}})
db.averages.updateMany({codigo:"AFPRE409k", ciclo:"VII", year:"2023",mencion:"ED"},{$set:{codigo:"AFPRE409"}})


db.averages.updateMany({codigo:"ABCOM101", ciclo:"I", year:"2023",mencion:"E"},{$set:{codigo:"FGCOM101"}})
db.averages.updateMany({codigo:"AFPDI107", ciclo:"I", year:"2023",mencion:"E"},{$set:{codigo:"FEDIB115"}})
db.averages.updateMany({codigo:"ABMES103", ciclo:"I", year:"2023",mencion:"E"},{$set:{codigo:"FGMES105"}})
db.averages.updateMany({codigo:"AFPDI211", ciclo:"III", year:"2023",mencion:"E"},{$set:{codigo:"FEDIB215"}})
db.averages.updateMany({codigo:"CAHAR401", ciclo:"V", year:"2023",mencion:"E"},{$set:{codigo:"CAHAR305"}})
db.averages.updateMany({codigo:"AFPDI313", ciclo:"V", year:"2023",mencion:"E"},{$set:{codigo:"FEDIB313"}})

db.averages.updateMany({codigo:"CAHAR401", ciclo:"V", year:"2023",mencion:"G"},{$set:{codigo:"CAHAR305"}})
db.averages.updateMany({codigo:"AFPDI313", ciclo:"V", year:"2023",mencion:"G"},{$set:{codigo:"FEDIB313"}})
db.averages.updateMany({codigo:"AFPDI211", ciclo:"III", year:"2023",mencion:"G"},{$set:{codigo:"FEDIB215"}})
db.averages.updateMany({codigo:"ABCOM101", ciclo:"I", year:"2023",mencion:"G"},{$set:{codigo:"FGCOM101"}})
db.averages.updateMany({codigo:"ABMES103", ciclo:"I", year:"2023",mencion:"G"},{$set:{codigo:"FGMES105"}})
db.averages.updateMany({codigo:"AFPDI107", ciclo:"I", year:"2023",mencion:"G"},{$set:{codigo:"FEDIB115"}})


db.averages.updateMany({codigo:"ABCOM101", ciclo:"I", year:"2023",mencion:"P"},{$set:{codigo:"FGCOM101"}})
db.averages.updateMany({codigo:"ABMES103", ciclo:"I", year:"2023",mencion:"P"},{$set:{codigo:"FGMES105"}})
db.averages.updateMany({codigo:"AFPDI107", ciclo:"I", year:"2023",mencion:"P"},{$set:{codigo:"FEDIB115"}})
db.averages.updateMany({codigo:"AFPDI211", ciclo:"III", year:"2023",mencion:"P"},{$set:{codigo:"FEDIB215"}})
db.averages.updateMany({codigo:"CAHAR401", ciclo:"V", year:"2023",mencion:"P"},{$set:{codigo:"CAHAR305"}})
db.averages.updateMany({user:ObjectId("65a16a29bcdc2163944df07b")},{$set:{solution:"0"}})



Comunicación II	39
Elementos Estéticos	22	
Pintura IV	17
Pintura IV	21
Grabado II	12
Grabado II	14
Investigación I	15
Curric. Tec. Y Gest.III	24
Tut. y Práct. Pedg IV	20
Tut. y Práct. Pedg IV	27
Pintura II	15
Pintura II	36	
Teoria de la Educ. I	29
Hist. del Arte II	14
Tall. Regional II	14
Tall. Regional II	17	
Cerámica II	21
Retrato II	19
Retrato II	26
Danza II	29
Tut. y Práct. Pedg IV	20
Tut. y Práct. Pedg IV	27
Método de est.virt.	30
Elementos Estéticos	22
Didáct.de las Artes I	14
Teoria de la Educ. I	29
Psicología	24
Did.de las Art. P. III	37
Curric. Tec. Y Gest.I	29
Filosofía I	17
Tut. y Práct. Pedg II	20
Tut. y Práct. Pedg II	27
Investigación III	33
Investigación III	37
Morfologia Visual II	16
Dibujo II	13	
Dibujo II	24
Escultura IV	32
Escultura IV	7	
Música	38
Dibujo VI	9
Dibujo VI	22	
Estadística	25
Estadística	
Teatro II	29
Tut. y Práct. Pedg IV	20
Tut. y Práct. Pedg IV	27
Escultura II	13
Escultura II	32
Dibujo IV	8
Dibujo IV	36
Sociedad	29
Música	38
Quechua	24
Educ.Intercult.Artis	36
Integración Artística	14
Integración Artística	24
Curric. Tec. Y Gest.III	24
Obra Artística	9
Obra Artística	33
Tut. y Práct. Pedg IV	20
Tut. y Práct. Pedg IV	27


Cmpt38NOTASComponent

*/

