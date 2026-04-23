#Name: ExtraUtilies2.zs
#Author: Feed the Beast and Sunekaer

print("Initializing 'ExtraUtilies2.zs'...");


//disabled dim
mods.jei.JEI.removeAndHide(<extrautils2:teleporter>);
mods.jei.JEI.removeAndHide(<extrautils2:teleporter:1>);

//recipe conflicts
recipes.removeShapeless(<extrautils2:ingredients> * 2, [<ore:oreRedstone>, <ore:dustPetrotheum>]);


mods.extrautils2.Crusher.remove(<minecraft:cobblestone>);
mods.extrautils2.Crusher.remove(<minecraft:gravel>);
mods.extrautils2.Crusher.add(<minecraft:gravel>, <minecraft:cobblestone>);
mods.extrautils2.Crusher.add(<minecraft:dirt>, <minecraft:gravel>);
mods.extrautils2.Crusher.add(<minecraft:sand>, <minecraft:dirt>);
mods.extrautils2.Crusher.add(<exnihilocreatio:block_dust>, <minecraft:sand>);

//remoing solar lunar panels
mods.jei.JEI.removeAndHide(<extrautils2:passivegenerator>);
mods.jei.JEI.removeAndHide(<extrautils2:passivegenerator:1>);

mods.extrautils2.Crusher.add(<exnihilocreatio:block_netherrack_crushed>, <minecraft:netherrack>);
mods.extrautils2.Crusher.add(<exnihilocreatio:block_endstone_crushed>, <minecraft:end_stone>);

//snow globe
mods.jei.JEI.removeAndHide(<extrautils2:snowglobe>);
recipes.addShaped(<extrautils2:snowglobe:1>, [
  [<ore:blockGlass>, <ore:treeSapling>, <minecraft:snowball>],
  [<ore:doorWood>, <ore:logWood>, <ore:grass>],
  [<ore:enderpearl>, <ore:netherStar>, null]
]);

mods.jei.JEI.removeAndHide(<extrautils2:suncrystal:250>);
recipes.addShapeless(<extrautils2:suncrystal>, [<ore:gemDiamond>, <ore:dustGlowstone>, <ore:dustGlowstone>, <ore:dustGlowstone>, <ore:dustGlowstone>]);

recipes.remove(<extrautils2:bagofholding>);
<extrautils2:bagofholding>.addTooltip(format.darkRed("Disabled due to bug!"));

print("Initialized 'ExtraUtilies2.zs'");
