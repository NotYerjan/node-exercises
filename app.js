// CHALLENGE 1
const surprisingFact = "The bumblebee bat is the world's smallest mammal";

console.log(surprisingFact);
console.dir(surprisingFact);

//CHALLENGE 2
const familyTree = [
  {
    name: "Person 1",
    children: [
      {
        name: "Person 2",
        children: [
          {
            name: "Person 3",
            children: [
              {
                name: "Person 4",
              },
            ],
          },
        ],
      },
    ],
  },
];

console.dir(familyTree, { depth: "all" });
console.log(JSON.stringify(familyTree));

//CHALLENGE
let count = 0;
function importantTask() {
  if (count < 4) {
    count += 1;
  } else {
    count = 0;
    console.countReset();
  }
  console.count();
}

importantTask();
importantTask();
importantTask();
importantTask();
importantTask();
importantTask();
