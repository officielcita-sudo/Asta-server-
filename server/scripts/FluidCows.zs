recipes.addShaped(<fluidcows:cow_displayer>.withTag({fluid: "lava"}), [
  [<minecraft:leather>, <minecraft:leather>, <minecraft:leather>],
  [<minecraft:leather>, <minecraft:lava_bucket>, <minecraft:leather>],
  [<minecraft:leather>, <minecraft:leather>, <minecraft:leather>]
]);

recipes.addShaped(<fluidcows:cow_displayer>.withTag({fluid: "water"}), [
  [<minecraft:leather>, <minecraft:leather>, <minecraft:leather>],
  [<minecraft:leather>, <minecraft:water_bucket>, <minecraft:leather>],
  [<minecraft:leather>, <minecraft:leather>, <minecraft:leather>]
]);

recipes.addShaped(<fluidcows:cow_displayer>.withTag({fluid: "milk"}), [
  [<minecraft:leather>, <minecraft:leather>, <minecraft:leather>],
  [<minecraft:leather>, <minecraft:milk_bucket>, <minecraft:leather>],
  [<minecraft:leather>, <minecraft:leather>, <minecraft:leather>]
]);

recipes.addShaped(<fluidcows:cow_displayer>.withTag({fluid: "stone"}), [
  [<minecraft:leather>, <minecraft:leather>, <minecraft:leather>],
  [<minecraft:leather>, <forge:bucketfilled>.withTag({FluidName: "stone", Amount: 1000}), <minecraft:leather>],
  [<minecraft:leather>, <minecraft:leather>, <minecraft:leather>]
]);
