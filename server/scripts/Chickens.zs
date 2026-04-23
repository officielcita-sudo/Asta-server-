#Name: Chickens.zs
#Author: Feed the Beast and Sunekaer

print("Initializing 'Chickens.zs'...");


recipes.remove(<chickens:henhouse>);
recipes.addShaped(<chickens:henhouse>, [
  [<minecraft:planks>, <minecraft:planks>, <minecraft:planks>],
  [<minecraft:planks>, <minecraft:hay_block:*>, <minecraft:planks>],
  [<minecraft:planks>, <minecraft:planks>, <minecraft:planks>]
]);

recipes.remove(<chickens:colored_egg>);
recipes.remove(<chickens:colored_egg:1>);
recipes.remove(<chickens:colored_egg:2>);
recipes.remove(<chickens:colored_egg:3>);
recipes.remove(<chickens:colored_egg:4>);
recipes.remove(<chickens:colored_egg:5>);
recipes.remove(<chickens:colored_egg:6>);
recipes.remove(<chickens:colored_egg:7>);
recipes.remove(<chickens:colored_egg:8>);
recipes.remove(<chickens:colored_egg:9>);
recipes.remove(<chickens:colored_egg:10>);
recipes.remove(<chickens:colored_egg:11>);
recipes.remove(<chickens:colored_egg:12>);
recipes.remove(<chickens:colored_egg:13>);
recipes.remove(<chickens:colored_egg:14>);
recipes.remove(<chickens:colored_egg:15>);

recipes.addShaped(<chickens:colored_egg>, [
  [<ore:dyeBlack>, <ore:dyeBlack>, <ore:dyeBlack>],
  [<ore:dyeBlack>, <minecraft:egg>, <ore:dyeBlack>],
  [<ore:dyeBlack>, <ore:dyeBlack>, <ore:dyeBlack>]
]);
recipes.addShaped(<chickens:colored_egg:1>, [
  [<ore:dyeRed>, <ore:dyeRed>, <ore:dyeRed>],
  [<ore:dyeRed>, <minecraft:egg>, <ore:dyeRed>],
  [<ore:dyeRed>, <ore:dyeRed>, <ore:dyeRed>]
]);
recipes.addShaped(<chickens:colored_egg:2>, [
  [<ore:dyeGreen>, <ore:dyeGreen>, <ore:dyeGreen>],
  [<ore:dyeGreen>, <minecraft:egg>, <ore:dyeGreen>],
  [<ore:dyeGreen>, <ore:dyeGreen>, <ore:dyeGreen>]
]);
recipes.addShaped(<chickens:colored_egg:3>, [
  [<ore:dyeBrown>, <ore:dyeBrown>, <ore:dyeBrown>],
  [<ore:dyeBrown>, <minecraft:egg>, <ore:dyeBrown>],
  [<ore:dyeBrown>, <ore:dyeBrown>, <ore:dyeBrown>]
]);
recipes.addShaped(<chickens:colored_egg:4>, [
  [<ore:dyeBlue>, <ore:dyeBlue>, <ore:dyeBlue>],
  [<ore:dyeBlue>, <minecraft:egg>, <ore:dyeBlue>],
  [<ore:dyeBlue>, <ore:dyeBlue>, <ore:dyeBlue>]
]);
recipes.addShaped(<chickens:colored_egg:5>, [
  [<ore:dyePurple>, <ore:dyePurple>, <ore:dyePurple>],
  [<ore:dyePurple>, <minecraft:egg>, <ore:dyePurple>],
  [<ore:dyePurple>, <ore:dyePurple>, <ore:dyePurple>]
]);
recipes.addShaped(<chickens:colored_egg:6>, [
  [<ore:dyeCyan>, <ore:dyeCyan>, <ore:dyeCyan>],
  [<ore:dyeCyan>, <minecraft:egg>, <ore:dyeCyan>],
  [<ore:dyeCyan>, <ore:dyeCyan>, <ore:dyeCyan>]
]);
recipes.addShaped(<chickens:colored_egg:7>, [
  [<ore:dyeLightGray>, <ore:dyeLightGray>, <ore:dyeLightGray>],
  [<ore:dyeLightGray>, <minecraft:egg>, <ore:dyeLightGray>],
  [<ore:dyeLightGray>, <ore:dyeLightGray>, <ore:dyeLightGray>]
]);
recipes.addShaped(<chickens:colored_egg:8>, [
  [<ore:dyeGray>, <ore:dyeGray>, <ore:dyeGray>],
  [<ore:dyeGray>, <minecraft:egg>, <ore:dyeGray>],
  [<ore:dyeGray>, <ore:dyeGray>, <ore:dyeGray>]
]);
recipes.addShaped(<chickens:colored_egg:9>, [
  [<ore:dyePink>, <ore:dyePink>, <ore:dyePink>],
  [<ore:dyePink>, <minecraft:egg>, <ore:dyePink>],
  [<ore:dyePink>, <ore:dyePink>, <ore:dyePink>]
]);
recipes.addShaped(<chickens:colored_egg:10>, [
  [<ore:dyeLime>, <ore:dyeLime>, <ore:dyeLime>],
  [<ore:dyeLime>, <minecraft:egg>, <ore:dyeLime>],
  [<ore:dyeLime>, <ore:dyeLime>, <ore:dyeLime>]
]);
recipes.addShaped(<chickens:colored_egg:11>, [
  [<ore:dyeYellow>, <ore:dyeYellow>, <ore:dyeYellow>],
  [<ore:dyeYellow>, <minecraft:egg>, <ore:dyeYellow>],
  [<ore:dyeYellow>, <ore:dyeYellow>, <ore:dyeYellow>]
]);
recipes.addShaped(<chickens:colored_egg:12>, [
  [<ore:dyeLightBlue>, <ore:dyeLightBlue>, <ore:dyeLightBlue>],
  [<ore:dyeLightBlue>, <minecraft:egg>, <ore:dyeLightBlue>],
  [<ore:dyeLightBlue>, <ore:dyeLightBlue>, <ore:dyeLightBlue>]
]);
recipes.addShaped(<chickens:colored_egg:13>, [
  [<ore:dyeMagenta>, <ore:dyeMagenta>, <ore:dyeMagenta>],
  [<ore:dyeMagenta>, <minecraft:egg>, <ore:dyeMagenta>],
  [<ore:dyeMagenta>, <ore:dyeMagenta>, <ore:dyeMagenta>]
]);
recipes.addShaped(<chickens:colored_egg:14>, [
  [<ore:dyeOrange>, <ore:dyeOrange>, <ore:dyeOrange>],
  [<ore:dyeOrange>, <minecraft:egg>, <ore:dyeOrange>],
  [<ore:dyeOrange>, <ore:dyeOrange>, <ore:dyeOrange>]
]);
recipes.addShaped(<chickens:colored_egg:15>, [
  [<ore:dyeWhite>, <ore:dyeWhite>, <ore:dyeWhite>],
  [<ore:dyeWhite>, <minecraft:egg>, <ore:dyeWhite>],
  [<ore:dyeWhite>, <ore:dyeWhite>, <ore:dyeWhite>]
]);

recipes.addShaped(<chickens:spawn_egg>.withTag({
  ChickenType: {
    id: "chickens:flintchicken"
  }
}), [
  [<minecraft:flint>, <minecraft:flint>, <minecraft:flint>],
  [<minecraft:flint>, <minecraft:egg>, <minecraft:flint>],
  [<minecraft:flint>, <minecraft:flint>, <minecraft:flint>]
]);

recipes.addShaped(<chickens:spawn_egg>.withTag({
  ChickenType: {
    id: "chickens:sandchicken"
  }
}), [
  [<ore:sand>, <ore:sand>, <ore:sand>],
  [<ore:sand>, <minecraft:egg>, <ore:sand>],
  [<ore:sand>, <ore:sand>, <ore:sand>]
]);

recipes.addShaped(<chickens:spawn_egg>.withTag({
  ChickenType: {
    id: "chickens:logchicken"
  }
}), [
  [<ore:logWood>, <ore:logWood>, <ore:logWood>],
  [<ore:logWood>, <minecraft:egg>, <ore:logWood>],
  [<ore:logWood>, <ore:logWood>, <ore:logWood>]
]);

recipes.addShaped(<chickens:spawn_egg>.withTag({
  ChickenType: {
    id: "chickens:soulsandchicken"
  }
}), [
  [<ore:soulSand>, <ore:soulSand>, <ore:soulSand>],
  [<ore:soulSand>, <minecraft:egg>, <ore:soulSand>],
  [<ore:soulSand>, <ore:soulSand>, <ore:soulSand>]
]);

recipes.addShaped(<chickens:spawn_egg>.withTag({
  ChickenType: {
    id: "chickens:quartzchicken"
  }
}), [
  [<ore:gemQuartz>, <ore:gemQuartz>, <ore:gemQuartz>],
  [<ore:gemQuartz>, <minecraft:egg>, <ore:gemQuartz>],
  [<ore:gemQuartz>, <ore:gemQuartz>, <ore:gemQuartz>]
]);


print("Initialized 'Chickens.zs'");
