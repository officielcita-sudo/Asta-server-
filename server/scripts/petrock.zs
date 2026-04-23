#Name: petrock.zs
#Author: Feed the Beast and Sunekaer

print("Initializing 'petrock.zs'...");


recipes.remove(<petrock:prorderform>);
recipes.addShaped(<petrock:prorderform>, [
  [null, <minecraft:paper>, null],
  [<minecraft:paper>, <minecraft:dye>, <minecraft:paper>],
  [null, <minecraft:paper>, null]
]);


print("Initialized 'petrock.zs'");
