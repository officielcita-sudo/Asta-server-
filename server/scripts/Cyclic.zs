#Name: Cyclic.zs
#Author: Feed the Beast and Sunekaer

print("Initializing 'Cyclic.zs'...");


//Removing duplicate armor/tools
mods.jei.JEI.removeAndHide(<cyclicmagic:emerald_helmet>);
mods.jei.JEI.removeAndHide(<cyclicmagic:emerald_chestplate>);
mods.jei.JEI.removeAndHide(<cyclicmagic:emerald_leggings>);
mods.jei.JEI.removeAndHide(<cyclicmagic:emerald_boots>);
mods.jei.JEI.removeAndHide(<cyclicmagic:emerald_sword>);
mods.jei.JEI.removeAndHide(<cyclicmagic:emerald_pickaxe>);
mods.jei.JEI.removeAndHide(<cyclicmagic:emerald_axe>);
mods.jei.JEI.removeAndHide(<cyclicmagic:emerald_spade>);
mods.jei.JEI.removeAndHide(<cyclicmagic:emerald_hoe>);


//ender wing and wind prime do to it spawning the play on top of the world in lava
mods.jei.JEI.removeAndHide(<cyclicmagic:tool_warp_spawn>);
mods.jei.JEI.removeAndHide(<cyclicmagic:tool_warp_home>);

//Ore pieces to chunks
mods.cyclicmagic.Packager.addRecipe(<exnihilocreatio:item_ore_gold:1>, <exnihilocreatio:item_ore_gold>*4);
mods.cyclicmagic.Packager.addRecipe(<exnihilocreatio:item_ore_copper:1>, <exnihilocreatio:item_ore_copper>*4);
mods.cyclicmagic.Packager.addRecipe(<exnihilocreatio:item_ore_iron:1>, <exnihilocreatio:item_ore_iron>*4);
mods.cyclicmagic.Packager.addRecipe(<exnihilocreatio:item_ore_tin:1>, <exnihilocreatio:item_ore_tin>*4);
mods.cyclicmagic.Packager.addRecipe(<exnihilocreatio:item_ore_aluminium:1>, <exnihilocreatio:item_ore_aluminium>*4);
mods.cyclicmagic.Packager.addRecipe(<exnihilocreatio:item_ore_lead:1>, <exnihilocreatio:item_ore_lead>*4);
mods.cyclicmagic.Packager.addRecipe(<exnihilocreatio:item_ore_lead:1>, <exnihilocreatio:item_ore_lead>*4);
mods.cyclicmagic.Packager.addRecipe(<exnihilocreatio:item_ore_silver:1>, <exnihilocreatio:item_ore_silver>*4);
mods.cyclicmagic.Packager.addRecipe(<exnihilocreatio:item_ore_nickel:1>, <exnihilocreatio:item_ore_nickel>*4);
mods.cyclicmagic.Packager.addRecipe(<exnihilocreatio:item_ore_ardite:1>, <exnihilocreatio:item_ore_ardite>*4);
mods.cyclicmagic.Packager.addRecipe(<exnihilocreatio:item_ore_cobalt:1>, <exnihilocreatio:item_ore_cobalt>*4);
mods.cyclicmagic.Packager.addRecipe(<exnihilocreatio:item_ore_osmium:1>, <exnihilocreatio:item_ore_osmium>*4);

recipes.remove(<cyclicmagic:uncrafting_block>);
// added via Fusion crafting

print("Initialized 'Cyclic.zs'");
