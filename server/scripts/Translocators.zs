#Name: Translocators.zs
#Author: Feed the Beast and Sunekaer

print("Initializing 'Translocators.zs'...");


recipes.addShapeless(<translocators:diamond_nugget>,
  [<thermalfoundation:material:16>]
);

recipes.removeShapeless(<translocators:diamond_nugget> * 9, [<minecraft:diamond>]);


print("Initialized 'Translocators.zs'");
