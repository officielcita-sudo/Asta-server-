#Name: 00_oreDict.zs
#Author: Feed the Beast and Sunekaer


print("Initializing '00_oreDict.zs'...");

	val toolHoe = <ore:toolHoe>;
	for item in toolHoe.items {
		toolHoe.remove(item);
	}

<ore:blockCoalCoke>.add(<thermalfoundation:storage_resource:1>);
<ore:rodStone>.remove(<microblockcbe:stone_rod>);
<ore:listAlllava>.add(<minecraft:lava_bucket>);
<ore:listAlllava>.add(<chickens:liquid_egg:1>);
//<ore:listAlllava>.add(<ceramics:clay_bucket>.withTag({fluids: {FluidName: "lava", Amount: 1000}}));
<ore:listAllwater>.add(<chickens:liquid_egg>);
//<ore:listAllwater>.add(<ceramics:clay_bucket>.withTag({fluids: {FluidName: "water", Amount: 1000}}));
<ore:dragonScale>.add(<mysticalagradditions:stuff:3>);

<ore:oakPlanks>.add(<minecraft:planks>);
<ore:oakPlanks>.add(<chisel:planks-oak>);
<ore:oakPlanks>.add(<chisel:planks-oak:1>);
<ore:oakPlanks>.add(<chisel:planks-oak:2>);
<ore:oakPlanks>.add(<chisel:planks-oak:3>);
<ore:oakPlanks>.add(<chisel:planks-oak:4>);
<ore:oakPlanks>.add(<chisel:planks-oak:5>);
<ore:oakPlanks>.add(<chisel:planks-oak:6>);
<ore:oakPlanks>.add(<chisel:planks-oak:7>);
<ore:oakPlanks>.add(<chisel:planks-oak:8>);
<ore:oakPlanks>.add(<chisel:planks-oak:9>);
<ore:oakPlanks>.add(<chisel:planks-oak:10>);
<ore:oakPlanks>.add(<chisel:planks-oak:11>);
<ore:oakPlanks>.add(<chisel:planks-oak:12>);
<ore:oakPlanks>.add(<chisel:planks-oak:13>);
<ore:oakPlanks>.add(<chisel:planks-oak:14>);


<ore:acaciaPlanks>.add(<minecraft:planks:4>);
<ore:acaciaPlanks>.add(<chisel:planks-acacia>);
<ore:acaciaPlanks>.add(<chisel:planks-acacia:1>);
<ore:acaciaPlanks>.add(<chisel:planks-acacia:2>);
<ore:acaciaPlanks>.add(<chisel:planks-acacia:3>);
<ore:acaciaPlanks>.add(<chisel:planks-acacia:4>);
<ore:acaciaPlanks>.add(<chisel:planks-acacia:5>);
<ore:acaciaPlanks>.add(<chisel:planks-acacia:6>);
<ore:acaciaPlanks>.add(<chisel:planks-acacia:7>);
<ore:acaciaPlanks>.add(<chisel:planks-acacia:8>);
<ore:acaciaPlanks>.add(<chisel:planks-acacia:9>);
<ore:acaciaPlanks>.add(<chisel:planks-acacia:10>);
<ore:acaciaPlanks>.add(<chisel:planks-acacia:11>);
<ore:acaciaPlanks>.add(<chisel:planks-acacia:12>);
<ore:acaciaPlanks>.add(<chisel:planks-acacia:13>);
<ore:acaciaPlanks>.add(<chisel:planks-acacia:14>);


<ore:birchPlanks>.add(<minecraft:planks:2>);
<ore:birchPlanks>.add(<chisel:planks-birch>);
<ore:birchPlanks>.add(<chisel:planks-birch:1>);
<ore:birchPlanks>.add(<chisel:planks-birch:2>);
<ore:birchPlanks>.add(<chisel:planks-birch:3>);
<ore:birchPlanks>.add(<chisel:planks-birch:4>);
<ore:birchPlanks>.add(<chisel:planks-birch:5>);
<ore:birchPlanks>.add(<chisel:planks-birch:6>);
<ore:birchPlanks>.add(<chisel:planks-birch:7>);
<ore:birchPlanks>.add(<chisel:planks-birch:8>);
<ore:birchPlanks>.add(<chisel:planks-birch:9>);
<ore:birchPlanks>.add(<chisel:planks-birch:10>);
<ore:birchPlanks>.add(<chisel:planks-birch:11>);
<ore:birchPlanks>.add(<chisel:planks-birch:12>);
<ore:birchPlanks>.add(<chisel:planks-birch:13>);
<ore:birchPlanks>.add(<chisel:planks-birch:14>);


<ore:darkOakPlanks>.add(<minecraft:planks:5>);
<ore:darkOakPlanks>.add(<chisel:planks-dark-oak>);
<ore:darkOakPlanks>.add(<chisel:planks-dark-oak:1>);
<ore:darkOakPlanks>.add(<chisel:planks-dark-oak:2>);
<ore:darkOakPlanks>.add(<chisel:planks-dark-oak:3>);
<ore:darkOakPlanks>.add(<chisel:planks-dark-oak:4>);
<ore:darkOakPlanks>.add(<chisel:planks-dark-oak:5>);
<ore:darkOakPlanks>.add(<chisel:planks-dark-oak:6>);
<ore:darkOakPlanks>.add(<chisel:planks-dark-oak:7>);
<ore:darkOakPlanks>.add(<chisel:planks-dark-oak:9>);
<ore:darkOakPlanks>.add(<chisel:planks-dark-oak:8>);
<ore:darkOakPlanks>.add(<chisel:planks-dark-oak:10>);
<ore:darkOakPlanks>.add(<chisel:planks-dark-oak:11>);
<ore:darkOakPlanks>.add(<chisel:planks-dark-oak:12>);
<ore:darkOakPlanks>.add(<chisel:planks-dark-oak:13>);
<ore:darkOakPlanks>.add(<chisel:planks-dark-oak:14>);


<ore:junglePlanks>.add(<minecraft:planks:3>);
<ore:junglePlanks>.add(<chisel:planks-jungle>);
<ore:junglePlanks>.add(<chisel:planks-jungle:1>);
<ore:junglePlanks>.add(<chisel:planks-jungle:2>);
<ore:junglePlanks>.add(<chisel:planks-jungle:3>);
<ore:junglePlanks>.add(<chisel:planks-jungle:4>);
<ore:junglePlanks>.add(<chisel:planks-jungle:5>);
<ore:junglePlanks>.add(<chisel:planks-jungle:6>);
<ore:junglePlanks>.add(<chisel:planks-jungle:7>);
<ore:junglePlanks>.add(<chisel:planks-jungle:8>);
<ore:junglePlanks>.add(<chisel:planks-jungle:9>);
<ore:junglePlanks>.add(<chisel:planks-jungle:10>);
<ore:junglePlanks>.add(<chisel:planks-jungle:11>);
<ore:junglePlanks>.add(<chisel:planks-jungle:12>);
<ore:junglePlanks>.add(<chisel:planks-jungle:13>);
<ore:junglePlanks>.add(<chisel:planks-jungle:14>);


<ore:sprucePlanks>.add(<minecraft:planks:1>);
<ore:sprucePlanks>.add(<chisel:planks-spruce>);
<ore:sprucePlanks>.add(<chisel:planks-spruce:1>);
<ore:sprucePlanks>.add(<chisel:planks-spruce:2>);
<ore:sprucePlanks>.add(<chisel:planks-spruce:3>);
<ore:sprucePlanks>.add(<chisel:planks-spruce:4>);
<ore:sprucePlanks>.add(<chisel:planks-spruce:5>);
<ore:sprucePlanks>.add(<chisel:planks-spruce:6>);
<ore:sprucePlanks>.add(<chisel:planks-spruce:7>);
<ore:sprucePlanks>.add(<chisel:planks-spruce:8>);
<ore:sprucePlanks>.add(<chisel:planks-spruce:9>);
<ore:sprucePlanks>.add(<chisel:planks-spruce:10>);
<ore:sprucePlanks>.add(<chisel:planks-spruce:11>);
<ore:sprucePlanks>.add(<chisel:planks-spruce:12>);
<ore:sprucePlanks>.add(<chisel:planks-spruce:13>);
<ore:sprucePlanks>.add(<chisel:planks-spruce:14>);


print("Initialized '00_oreDict.zs'");
