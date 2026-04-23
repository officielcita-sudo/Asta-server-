#Name: ProjectE.zs
#Author: Feed the Beast and Sunekaer

print("Initializing 'ProjectE.zs'...");


//GemLeggings
recipes.remove(<projecte:item.pe_gem_armor_1>);
recipes.addShapeless(<projecte:item.pe_gem_armor_1>, [<projecte:item.pe_rm_armor_1>, <projecte:item.pe_klein_star:5>, <projecte:item.pe_black_hole>]);

//CollectorsandRelays
recipes.remove(<projecte:collector_mk1>);
recipes.remove(<projecte:collector_mk2>);
recipes.remove(<projecte:collector_mk3>);
recipes.remove(<projecte:relay_mk1>);
recipes.remove(<projecte:relay_mk2>);
recipes.remove(<projecte:relay_mk3>);
//recipesaddedviaCustomFusionRecipes.jsoninconfig/brandon3055

//CovalenceDust
recipes.remove(<projecte:item.pe_covalence_dust>*40);
mods.actuallyadditions.Empowerer.addRecipe(<projecte:item.pe_covalence_dust>*40, <extrautils2:compressedcobblestone:1>, <minecraft:redstone>, <minecraft:redstone>, <minecraft:redstone>, <minecraft:redstone>, 1000, 80);

recipes.remove(<projecte:item.pe_covalence_dust:1>*40);
mods.actuallyadditions.Empowerer.addRecipe(<projecte:item.pe_covalence_dust:1>*40, <mysticalagriculture:crafting:32>, <minecraft:redstone>, <minecraft:redstone>, <minecraft:redstone>, <minecraft:redstone>, 1000, 80);

recipes.remove(<projecte:item.pe_covalence_dust:2>*40);
mods.actuallyadditions.Empowerer.addRecipe(<projecte:item.pe_covalence_dust:2>*40, <rftools:infused_diamond>, <minecraft:coal>, <minecraft:coal>, <minecraft:coal>, <minecraft:coal>, 1000, 80);

//AlchemicalChest
recipes.remove(<projecte:alchemical_chest>);
recipes.addShaped(<projecte:alchemical_chest>, [
  [<projecte:item.pe_covalence_dust>, <projecte:item.pe_covalence_dust:1>, <projecte:item.pe_covalence_dust:2>],
  [<ore:stone>, <avaritia:resource>, <ore:stone>],
  [<enderio:item_alloy_ingot:6>, <ironchest:iron_chest:2>, <enderio:item_alloy_ingot:6>]
]);

//Condenser
recipes.remove(<projecte:condenser_mk1>);
recipes.remove(<projecte:condenser_mk2>);
//recipesaddedviaCustomFusionRecipes.jsoninconfig/brandon3055

//TomeofKnowledge
recipes. remove(<projecte:item.pe_tome>);
//recipesaddedviaCustomFusionRecipes.jsoninconfig/brandon3055

//PhilosophersStone
recipes.remove(<projecte:item.pe_philosophers_stone>);
recipes.addShaped(<projecte:item.pe_philosophers_stone>, [
  [<minecraft:glowstone>, <minecraft:redstone_block>, <minecraft:glowstone>],
  [<minecraft:redstone_block>, <actuallyadditions:item_misc:19>, <minecraft:redstone_block>],
  [<minecraft:diamond_block>, <minecraft:emerald_block>, <minecraft:diamond_block>]
]);

//Repair Talisman
recipes.remove(<projecte:item.pe_repair_talisman>);
mods.actuallyadditions.Empowerer.addRecipe(<projecte:item.pe_repair_talisman>, <projecte:item.pe_klein_star:4>.withTag({}), <minecraft:diamond_block>, <actuallyadditions: block_crystal: 1 > , < actuallyadditions: block_crystal: 4 > , < minecraft: enchanted_book > .withTag({
  StoredEnchantments: [{
    lvl: 1 as short,
    id: 70 as short
  }]
}), 500000, 160);

//TransmutationTable
recipes.remove(<projecte:transmutation_table>);
mods.avaritia.ExtremeCrafting.addShaped("TransmutationTable", <projecte:transmutation_table>, [
  [<minecraft:dragon_egg>, null, null, null, null, null, null, null, <minecraft:dragon_egg>],
  [null, <avaritia:resource:3>, <avaritia:resource:3>, <projecte:item.pe_matter>, <projecte:item.pe_matter>,<projecte:item.pe_matter>, <avaritia:resource:3>, <avaritia:resource:3>, null],
  [null, <avaritia:resource:3>, <storagedrawers:upgrade_storage:4>, <tconstruct:ingots:3>, <quantumflux:craftingpiece>, <tconstruct:ingots:3>, <storagedrawers:upgrade_storage:4>, <avaritia:resource:3>, null],
  [null, <projecte:item.pe_matter>, <tconstruct:ingots:3>, <projecte:alchemical_chest>, <projecte:collector_mk2>, <projecte:alchemical_chest>, <tconstruct:ingots:3>, <projecte:item.pe_matter>, null],
  [null, <projecte:item.pe_matter>, <quantumflux:craftingpiece>, <projecte:relay_mk2>, <projecte:condenser_mk1>, <projecte:relay_mk2>, <quantumflux:craftingpiece>, <projecte:item.pe_matter>, null],
  [null, <projecte:item.pe_matter>, <tconstruct:ingots:3>, <projecte:alchemical_chest>, <projecte:collector_mk2>, <projecte:alchemical_chest>, <tconstruct:ingots:3>, <projecte:item.pe_matter>, null],
  [null, <avaritia:resource:3>, <storagedrawers:upgrade_storage:4>, <tconstruct:ingots:3>, <quantumflux:craftingpiece>, <tconstruct:ingots:3>, <storagedrawers:upgrade_storage:4>, <avaritia:resource:3>, null],
  [null, <avaritia:resource:3>, <avaritia:resource:3>, <projecte:item.pe_matter>, <projecte:item.pe_matter>,<projecte:item.pe_matter>, <avaritia:resource:3>, <avaritia:resource:3>, null],
  [<minecraft:dragon_egg>, null, null, null, null, null, null, null, <minecraft:dragon_egg>]
]);

//TransmutationTablet
recipes.remove(<projecte:item.pe_transmutation_tablet>);
mods.avaritia.ExtremeCrafting.addShaped("TransmutationTablet", <projecte:item.pe_transmutation_tablet>, [
  [<projecte:condenser_mk2>, <draconicevolution:chaos_shard>, <avaritia:resource:4>, <avaritia:resource:4>, <avaritia:resource:4>, <avaritia:resource:4>, <avaritia:resource:4>, <draconicevolution:chaos_shard>, <projecte:condenser_mk2>],
  [<draconicevolution:chaos_shard>, <projecte:matter_block:1>, <mekanism:polyethene:2>, <projecte:matter_block:1>, <mekanism:polyethene:2>, <projecte:matter_block:1>, <mekanism:polyethene:2>, <projecte:matter_block:1>, <draconicevolution:chaos_shard>],
  [<avaritia:resource:4>, <mekanism:polyethene:2>, <actuallyadditions:item_misc:19>, <avaritia:resource:6>, <draconicevolution:chaos_shard>, <avaritia:resource:6>, <actuallyadditions:item_misc:19>, <mekanism:polyethene:2>, <avaritia:resource:4>],
  [<avaritia:resource:4>, <projecte:matter_block:1>, <avaritia:resource:6>, <industrialforegoing:black_hole_unit>, <actuallyadditions:item_misc:19>, <industrialforegoing:black_hole_unit>, <avaritia:resource:6>, <projecte:matter_block:1>, <avaritia:resource:4>],
  [<avaritia:resource:4>, <mekanism:polyethene:2>, <draconicevolution:chaos_shard>, <actuallyadditions:item_misc:19>, <projecte:transmutation_table>, <actuallyadditions:item_misc:19>, <draconicevolution:chaos_shard>, <mekanism:polyethene:2>, <avaritia:resource:4>],
  [<avaritia:resource:4>, <projecte:matter_block:1>, <avaritia:resource:6>, <industrialforegoing:black_hole_unit>, <actuallyadditions:item_misc:19>, <industrialforegoing:black_hole_unit>, <avaritia:resource:6>, <projecte:matter_block:1>, <avaritia:resource:4>],
  [<avaritia:resource:4>, <mekanism:polyethene:2>, <actuallyadditions:item_misc:19>, <avaritia:resource:6>, <draconicevolution:chaos_shard>, <avaritia:resource:6>, <actuallyadditions:item_misc:19>, <mekanism:polyethene:2>, <avaritia:resource:4>],
  [<draconicevolution:chaos_shard>, <projecte:matter_block:1>, <mekanism:polyethene:2>, <projecte:matter_block:1>, <mekanism:polyethene:2>, <projecte:matter_block:1>, <mekanism:polyethene:2>, <projecte:matter_block:1>, <draconicevolution:chaos_shard>],
  [<projecte:condenser_mk2>, <draconicevolution:chaos_shard>, <avaritia:resource:4>, <avaritia:resource:4>, <avaritia:resource:4>, <avaritia:resource:4>, <avaritia:resource:4>, <draconicevolution:chaos_shard>, <projecte:condenser_mk2>]
]);


recipes.remove(<projecte:item.pe_time_watch>);
recipes.addShaped(<projecte:item.pe_time_watch>, [
  [<projecte:item.pe_matter>, <minecraft:glowstone>, <projecte:item.pe_matter>],
  [<projecte:matter_block:1>, <minecraft:clock>, <projecte:matter_block:1>],
  [<projecte:item.pe_matter>, <minecraft:glowstone>, <projecte:item.pe_matter>]
]);



print("Initialized 'ProjectE.zs'");
