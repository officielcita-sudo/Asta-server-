#Name: Thaumcraft.zs
#Author: Feed the Beast and Sunekaer

print("Initializing 'Thaumcraft.zs'...");


recipes.addShaped(<thaumcraft:celestial_notes>, [
  [<ore:paper>, <ore:paper>, <ore:paper>],
  [<ore:paper>, <ore:glowstone>, <ore:paper>],
  [<ore:paper>, <ore:paper>, <ore:paper>]
]);

recipes.addShaped(<thaumcraft:celestial_notes:1>, [
  [<ore:paper>, <ore:paper>, <ore:paper>],
  [<ore:blockCoal>, <ore:paper>, <ore:paper>],
  [<ore:paper>, <ore:paper>, <ore:paper>]
]);

recipes.addShaped(<thaumcraft:celestial_notes:2>, [
  [<ore:paper>, <ore:paper>, <ore:paper>],
  [<ore:paper>, <ore:blockCoal>, <ore:paper>],
  [<ore:paper>, <ore:paper>, <ore:paper>]
]);

recipes.addShaped(<thaumcraft:celestial_notes:3>, [
  [<ore:paper>, <ore:paper>, <ore:paper>],
  [<ore:paper>, <ore:paper>, <ore:blockCoal>],
  [<ore:paper>, <ore:paper>, <ore:paper>]
]);

recipes.addShaped(<thaumcraft:celestial_notes:4>, [
  [<ore:paper>, <ore:paper>, <ore:paper>],
  [<ore:paper>, <ore:blockCoal>, <ore:blockWoolGray>],
  [<ore:paper>, <ore:paper>, <ore:paper>]
]);

recipes.addShaped(<thaumcraft:celestial_notes:5>, [
  [<ore:paper>, <ore:paper>, <ore:paper>],
  [<ore:blockWoolLightGray>, <ore:blockWoolLightGray>, <ore:blockWoolGray>],
  [<ore:paper>, <ore:paper>, <ore:paper>]
]);

recipes.addShaped(<thaumcraft:celestial_notes:6>, [
  [<ore:paper>, <ore:paper>, <ore:paper>],
  [<ore:blockWoolBlack>, <ore:blockWoolGray>, <ore:blockWoolLightGray>],
  [<ore:paper>, <ore:paper>, <ore:paper>]
]);

recipes.addShaped(<thaumcraft:celestial_notes:7>, [
  [<ore:paper>, <ore:paper>, <ore:paper>],
  [<ore:blockWoolBlack>, <ore:blockWoolGray>, <ore:blockWoolGray>],
  [<ore:paper>, <ore:paper>, <ore:paper>]
]);

recipes.addShaped(<thaumcraft:celestial_notes:8>, [
  [<ore:paper>, <ore:paper>, <ore:paper>],
  [<ore:blockWoolBlack>, <ore:blockWoolBlack>, <ore:blockWoolGray>],
  [<ore:paper>, <ore:paper>, <ore:paper>]
]);

recipes.addShaped(<thaumcraft:celestial_notes:9>, [
  [<ore:paper>, <ore:paper>, <ore:paper>],
  [<ore:blockWoolBlack>, <ore:blockWoolBlack>, <ore:blockWoolBlack>],
  [<ore:paper>, <ore:paper>, <ore:paper>]
]);

recipes.addShaped(<thaumcraft:celestial_notes:10>, [
  [<ore:paper>, <ore:paper>, <ore:paper>],
  [<ore:blockWoolGray>, <ore:blockWoolBlack>, <ore:blockWoolBlack>],
  [<ore:paper>, <ore:paper>, <ore:paper>]
]);

recipes.addShaped(<thaumcraft:celestial_notes:11>, [
  [<ore:paper>, <ore:paper>, <ore:paper>],
  [<ore:blockWoolGray>, <ore:blockWoolGray>, <ore:blockWoolBlack>],
  [<ore:paper>, <ore:paper>, <ore:paper>]
]);

recipes.addShaped(<thaumcraft:celestial_notes:12>, [
  [<ore:paper>, <ore:paper>, <ore:paper>],
  [<ore:blockWoolLightGray>, <ore:blockWoolGray>, <ore:blockWoolBlack>],
  [<ore:paper>, <ore:paper>, <ore:paper>]
]);

mods.thaumcraft.Infusion.registerRecipe("Crimson_Rites", "UNLOCKINFUSION", <thaumcraft:curio:6>, 8, [
                                                                                            <aspect:aqua> *128,
                                                                                            <aspect:perditio> *128,
                                                                                            <aspect:aer> *128,
                                                                                            <aspect:ignis> *128,
                                                                                            <aspect:ordo> *128,
                                                                                            <aspect:terra> *128,
                                                                                            <aspect:auram> *250,
                                                                                            <aspect:praecantatio> *64,
                                                                                            <aspect:instrumentum> *64,
                                                                                            <aspect:alienis> *64,
                                                                                            <aspect:herba> *64,
                                                                                            <aspect:vitium> *64,
                                                                                            <aspect:exanimis> *64
                                                                                            ],
                                                                                              <thaumcraft:thaumonomicon>,
                                                                                                [
                                                                                                  <thaumcraft:amulet_vis:1>,
                                                                                                  <thaumcraft:amulet_vis:1>,
                                                                                                  <forge:bucketfilled>.withTag({FluidName: "liquid_death", Amount: 1000}),
                                                                                                  <forge:bucketfilled>.withTag({FluidName: "liquid_death", Amount: 1000}),
                                                                                                  <forge:bucketfilled>.withTag({FluidName: "liquid_death", Amount: 1000}),
                                                                                                  <forge:bucketfilled>.withTag({FluidName: "liquid_death", Amount: 1000}),
                                                                                                  <thaumcraft:scribing_tools>,
                                                                                                  <thaumcraft:scribing_tools>,
                                                                                                  <thaumcraft:baubles:1>.withTag({"TC.RUNIC": 3 as byte}),
                                                                                                  <thaumcraft:baubles:1>.withTag({"TC.RUNIC": 3 as byte}),
                                                                                                  <thaumcraft:focus_2>,
                                                                                                  <thaumcraft:focus_2>,
                                                                                                  <thaumcraft:ingot:1>,
                                                                                                  <thaumcraft:ingot:1>,
                                                                                                  <thaumcraft:ingot:1>,
                                                                                                  <thaumcraft:ingot:1>
                                                                                                ]
                                       );


mods.thaumcraft.Infusion.registerRecipe("Void_Seed", "UNLOCKINFUSION", <thaumcraft:void_seed>, 5, [
                                                                                           <aspect:vitium> *10
                                                                                           ],
                                                                                             <thaumcraft:ingot>,
                                                                                               [
                                                                                                 <minecraft:wheat_seeds>
                                                                                               ]
                                      );

recipes.remove(<thaumcraft:flesh_block>);
recipes.addShaped(<thaumcraft:flesh_block>, [
  [<minecraft:rotten_flesh:*>, <minecraft:rotten_flesh:*>, <minecraft:rotten_flesh:*>],
  [<minecraft:rotten_flesh:*>, <minecraft:leather>, <minecraft:rotten_flesh:*>],
  [<minecraft:rotten_flesh:*>, <minecraft:rotten_flesh:*>, <minecraft:rotten_flesh:*>]
]);

furnace.addRecipe(<thaumcraft:ingot:1>, <thaumcraft:void_seed>);

print("Initialized 'Thaumcraft.zs'");
