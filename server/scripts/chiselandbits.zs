#Name: ChiselandBits.zs
#Author: Feed the Beast and Sunekaer

print("Initializing 'ChiselandBits.zs'...");

recipes.remove(<chiselsandbits:wrench_wood>);
recipes.addShaped(<chiselsandbits:wrench_wood>, [
  [null, <ore:plankWood>, null],
  [<ore:plankWood>, <ore:stickWood>, null],
  [null, null, <ore:stickWood>]
]);


print("Initialized 'ChiselandBits.zs'");
