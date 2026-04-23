#Name: Minecraft.zs
#Author: Feed the Beast and Sunekaer

print("Initializing 'Minecraft.zs'...");


//Not the way to the End
mods.jei.JEI.removeAndHide(<minecraft:end_portal_frame>);

//Sponge
recipes.addShaped(<minecraft:sponge>, [
  [<minecraft:wool:4>, <excompressum:wood_chippings>, <minecraft:wool:4>],
  [<excompressum:wood_chippings>, <minecraft:slime>, <excompressum:wood_chippings>],
  [<minecraft:wool:4>, <excompressum:wood_chippings>, <minecraft:wool:4>]
]);
recipes.addShaped(<minecraft:sponge>, [
  [<mysticalagriculture:spider_essence>, <mysticalagriculture:nature_essence>, <mysticalagriculture:spider_essence>],
  [<mysticalagriculture:nature_essence>, <mysticalagriculture:slime_essence>, <mysticalagriculture:nature_essence>],
  [<mysticalagriculture:spider_essence>, <mysticalagriculture:nature_essence>, <mysticalagriculture:spider_essence>]
]);

//Addingmoremetalstobucketrecipe
recipes.addShaped(<minecraft:bucket>*1, [
    [<ore:ingotAluminum>, null, <ore:ingotAluminum>],
    [null, <ore:ingotAluminum>, null]
]);
recipes.addShaped(<minecraft:bucket>*1, [
  [<ore:ingotCopper>, null, <ore:ingotCopper>],
  [null, <ore:ingotCopper>, null]
]);
recipes.addShaped(<minecraft:bucket>*1, [
  [<ore:ingotLead>, null, <ore:ingotLead>],
  [null, <ore:ingotLead>, null]
]);

//spawner
recipes.addShaped(<minecraft:mob_spawner>, [
  [<enderio:block_dark_iron_bars>, <minecraft:iron_bars>, <enderio:block_dark_iron_bars>],
  [<minecraft:iron_bars>, <minecraft:dragon_egg>, <minecraft:iron_bars>],
  [<enderio:block_dark_iron_bars>, <minecraft:iron_bars>, <enderio:block_dark_iron_bars>]
]);

//Snad back to Sand
recipes.addShapeless(<minecraft:sand> * 2, [<snad:snad>]);
recipes.addShapeless(<minecraft:sand:1> * 2, [<snad:snad:1>]);

recipes.remove(<minecraft:name_tag>);
recipes.addShaped(<minecraft:name_tag>, [
  [<ore:dyeBlack>, <minecraft:leather>],
  [<ore:string>]
]);

recipes.addShaped(<minecraft:elytra>, [
  [<minecraft:string>, <minecraft:emerald>, <minecraft:string>],
  [<minecraft:paper>, <minecraft:leather_chestplate>, <minecraft:paper>],
  [<minecraft:feather>, null, <minecraft:feather>]
]);

recipes.addShapeless(<minecraft:dye:14>,
  [<ore:cropPumpkin>, <ore:cropPumpkin>]
);

recipes.addShapeless(<minecraft:planks>,
  [<ore:cropCactus>]
);

recipes.addShapeless(<minecraft:stick>,
  [<ore:bone>, <ore:bone>]
);

recipes.addShapeless(<minecraft:stick>,
  [<ore:treeSapling>]
);

recipes.addShapeless(<minecraft:wheat_seeds>,
  [<ore:cropWheat>, <ore:cropWheat>]
);

recipes.addShapeless(<minecraft:cobblestone>,
  [<ore:sandstone>]
);

recipes.remove(<minecraft:trapdoor>);
recipes.addShaped(<minecraft:trapdoor> * 2, [
  [<ore:oakPlanks>, <ore:oakPlanks>, <ore:oakPlanks>],
  [<ore:oakPlanks>, <ore:oakPlanks>, <ore:oakPlanks>]
]);

recipes.removeByRecipeName("thermalfoundation:paper");


print("Initialized 'Minecraft.zs'");
