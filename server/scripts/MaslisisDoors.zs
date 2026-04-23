#Name: MaslisisDoors.zs
#Author: Feed the Beast and Sunekaer


print("Initializing 'MaslisisDoors.zs'...");

recipes.remove(<malisisdoors:trapdoor_acacia>);
recipes.addShaped(<malisisdoors:trapdoor_acacia> *2, [
  [<ore:acaciaPlanks>, <ore:acaciaPlanks>, <ore:acaciaPlanks>],
  [<ore:acaciaPlanks>, <ore:acaciaPlanks>, <ore:acaciaPlanks>]
]);

recipes.remove(<malisisdoors:trapdoor_birch>);
recipes.addShaped(<malisisdoors:trapdoor_birch> *2, [
  [<ore:birchPlanks>, <ore:birchPlanks>, <ore:birchPlanks>],
  [<ore:birchPlanks>, <ore:birchPlanks>, <ore:birchPlanks>]
]);

recipes.remove(<malisisdoors:trapdoor_dark_oak>);
recipes.addShaped(<malisisdoors:trapdoor_dark_oak>, [
  [<ore:darkOakPlanks>, <ore:darkOakPlanks>, <ore:darkOakPlanks>],
  [<ore:darkOakPlanks>, <ore:darkOakPlanks>, <ore:darkOakPlanks>]
]);

recipes.remove(<malisisdoors:trapdoor_jungle>);
recipes.addShaped(<malisisdoors:trapdoor_jungle>, [
  [<ore:junglePlanks>, <ore:junglePlanks>, <ore:junglePlanks>],
  [<ore:junglePlanks>, <ore:junglePlanks>, <ore:junglePlanks>]
]);

recipes.remove(<malisisdoors:trapdoor_spruce>);
recipes.addShaped(<malisisdoors:trapdoor_spruce>, [
  [<ore:sprucePlanks>, <ore:sprucePlanks>, <ore:sprucePlanks>],
  [<ore:sprucePlanks>, <ore:sprucePlanks>, <ore:sprucePlanks>]
]);


print("Initialized 'MaslisisDoors.zs'");
