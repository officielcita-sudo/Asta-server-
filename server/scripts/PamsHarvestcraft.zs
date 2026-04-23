#Name: PamsHarvestcraft.zs
#Author: Feed the Beast and Sunekaer

print("Initializing 'PamsHarvestcraft.zs'...");


//Cotton to cotten?? not needed.. removed
recipes.removeShapeless(<harvestcraft:cottonitem>, [<ore:cropCotton>]);
mods.jei.JEI.removeAndHide(<harvestcraft:shippingbin>);

recipes.addShapeless(<harvestcraft:freshwateritem>, [<ceramics:clay_bucket>.withTag({fluids: {FluidName: "water", Amount: 1000}})]);


print("Initialized 'PamsHarvestcraft.zs'");
