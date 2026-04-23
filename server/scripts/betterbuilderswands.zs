#Name: betterbuilderswands.zs
#Author: Feed the Beast and Sunekaer

print("Initializing 'betterbuilderswands.zs'...");


recipes.remove(<betterbuilderswands:wandiron>);
recipes.addShaped(<betterbuilderswands:wandiron>, [
  [null, null, <ore:ingotIron>],
  [null, <ore:stickWood>, null],
  [<ore:stickWood>, null, null]
]);

recipes.remove(<betterbuilderswands:wanddiamond>);
recipes.addShaped(<betterbuilderswands:wanddiamond>, [
  [null, null, <ore:gemDiamond>],
  [null, <ore:stickWood>, null],
  [<ore:stickWood>, null, null]
]);


print("Initialized 'betterbuilderswands.zs'");
