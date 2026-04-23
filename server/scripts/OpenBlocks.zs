#Name: OpenBlocks.zs
#Author: Feed the Beast and Sunekaer

print("Initializing 'OpenBlocks.zs'...");


recipes.remove(<openblocks:scaffolding>);
recipes.addShaped(<openblocks:scaffolding> * 8, [
  [<ore:stickWood>, <ore:stickWood>, <ore:stickWood>],
  [<ore:stickWood>, <ore:plankWood>, <ore:stickWood>],
  [<ore:stickWood>, <ore:stickWood>, <ore:stickWood>]
]);

//Elevators
recipes.addShaped(<openblocks:elevator:15>, [
  [<ore:dyeBlack>, <ore:dyeBlack>, <ore:dyeBlack>],
  [<ore:dyeBlack>, <openblocks:elevator>, <ore:dyeBlack>],
  [<ore:dyeBlack>, <ore:dyeBlack>, <ore:dyeBlack>]
]);
recipes.addShaped(<openblocks:elevator:11>, [
  [<ore:dyeBlue>, <ore:dyeBlue>, <ore:dyeBlue>],
  [<ore:dyeBlue>, <openblocks:elevator>, <ore:dyeBlue>],
  [<ore:dyeBlue>, <ore:dyeBlue>, <ore:dyeBlue>]
]);
recipes.addShaped(<openblocks:elevator:12>, [
  [<ore:dyeBrown>, <ore:dyeBrown>, <ore:dyeBrown>],
  [<ore:dyeBrown>, <openblocks:elevator>, <ore:dyeBrown>],
  [<ore:dyeBrown>, <ore:dyeBrown>, <ore:dyeBrown>]
]);
recipes.addShaped(<openblocks:elevator:9>, [
  [<ore:dyeCyan>, <ore:dyeCyan>, <ore:dyeCyan>],
  [<ore:dyeCyan>, <openblocks:elevator>, <ore:dyeCyan>],
  [<ore:dyeCyan>, <ore:dyeCyan>, <ore:dyeCyan>]
]);
recipes.addShaped(<openblocks:elevator:7>, [
  [<ore:dyeGray>, <ore:dyeGray>, <ore:dyeGray>],
  [<ore:dyeGray>, <openblocks:elevator>, <ore:dyeGray>],
  [<ore:dyeGray>, <ore:dyeGray>, <ore:dyeGray>]
]);
recipes.addShaped(<openblocks:elevator:13>, [
  [<ore:dyeGreen>, <ore:dyeGreen>, <ore:dyeGreen>],
  [<ore:dyeGreen>, <openblocks:elevator>, <ore:dyeGreen>],
  [<ore:dyeGreen>, <ore:dyeGreen>, <ore:dyeGreen>]
]);
recipes.addShaped(<openblocks:elevator:3>, [
  [<ore:dyeLightBlue>, <ore:dyeLightBlue>, <ore:dyeLightBlue>],
  [<ore:dyeLightBlue>, <openblocks:elevator>, <ore:dyeLightBlue>],
  [<ore:dyeLightBlue>, <ore:dyeLightBlue>, <ore:dyeLightBlue>]
]);
recipes.addShaped(<openblocks:elevator:5>, [
  [<ore:dyeLightLime>, <ore:dyeLightLime>, <ore:dyeLightLime>],
  [<ore:dyeLightLime>, <openblocks:elevator>, <ore:dyeLightLime>],
  [<ore:dyeLightLime>, <ore:dyeLightLime>, <ore:dyeLightLime>]
]);
recipes.addShaped(<openblocks:elevator:2>, [
  [<ore:dyeMagenta>, <ore:dyeMagenta>, <ore:dyeMagenta>],
  [<ore:dyeMagenta>, <openblocks:elevator>, <ore:dyeMagenta>],
  [<ore:dyeMagenta>, <ore:dyeMagenta>, <ore:dyeMagenta>]
]);
recipes.addShaped(<openblocks:elevator:14>, [
  [<ore:dyeRed>, <ore:dyeRed>, <ore:dyeRed>],
  [<ore:dyeRed>, <openblocks:elevator>, <ore:dyeRed>],
  [<ore:dyeRed>, <ore:dyeRed>, <ore:dyeRed>]
]);
recipes.addShaped(<openblocks:elevator:4>, [
  [<ore:dyeYellow>, <ore:dyeYellow>, <ore:dyeYellow>],
  [<ore:dyeYellow>, <openblocks:elevator>, <ore:dyeYellow>],
  [<ore:dyeYellow>, <ore:dyeYellow>, <ore:dyeYellow>]
]);
recipes.addShaped(<openblocks:elevator:10>, [
  [<ore:dyePurple>, <ore:dyePurple>, <ore:dyePurple>],
  [<ore:dyePurple>, <openblocks:elevator>, <ore:dyePurple>],
  [<ore:dyePurple>, <ore:dyePurple>, <ore:dyePurple>]
]);
recipes.addShaped(<openblocks:elevator:1>, [
  [<ore:dyeOrange>, <ore:dyeOrange>, <ore:dyeOrange>],
  [<ore:dyeOrange>, <openblocks:elevator>, <ore:dyeOrange>],
  [<ore:dyeOrange>, <ore:dyeOrange>, <ore:dyeOrange>]
]);
recipes.addShaped(<openblocks:elevator:6>, [
  [<ore:dyePink>, <ore:dyePink>, <ore:dyePink>],
  [<ore:dyePink>, <openblocks:elevator>, <ore:dyePink>],
  [<ore:dyePink>, <ore:dyePink>, <ore:dyePink>]
]);
recipes.addShaped(<openblocks:elevator:8>, [
  [<ore:dyeLightGray>, <ore:dyeLightGray>, <ore:dyeLightGray>],
  [<ore:dyeLightGray>, <openblocks:elevator>, <ore:dyeLightGray>],
  [<ore:dyeLightGray>, <ore:dyeLightGray>, <ore:dyeLightGray>]
]);


print("Initialized 'OpenBlocks.zs'");
