#Name: LootTables.zs
#Author: Feed the Beast and Sunekaer

import loottweaker.vanilla.loot.LootTables;
import loottweaker.vanilla.loot.LootTable;
import loottweaker.vanilla.loot.LootPool;
import loottweaker.vanilla.loot.Functions;
import loottweaker.vanilla.loot.Conditions;

print("Initializing 'LootTables.zs'...");


 #Ender Chicken
 val ender = LootTables.getTable("mightyenderchicken:ender_chicken");
   val enderChicken = ender.addPool("dragonEgg", 1, 1, 0, 0);
     enderChicken.addItemEntry(<minecraft:dragon_egg>, 1);

   val enderChicken1 = ender.addPool("dragonHeart", 1, 1, 0, 0);
     enderChicken1.addItemEntry(<draconicevolution:dragon_heart>, 1);

   val enderChicken2 = ender.addPool("dragonScale", 1, 1, 0, 0);
     enderChicken2.addItemEntry(<mysticalagradditions:stuff:3> *4, 10);
     enderChicken2.addItemEntry(<mysticalagradditions:stuff:3> *5, 5);
     enderChicken2.addItemEntry(<mysticalagradditions:stuff:3> *6, 1);


 #Chaos Chicken
 val chaos = LootTables.getTable("mightyenderchicken:chaos_chicken");
   val chaosChicken = chaos.addPool("dragonHeart", 1, 1, 0, 0);
     chaosChicken.addItemEntry(<draconicevolution:dragon_heart>, 1);

   val chaosChicken1 = chaos.addPool("chaosShard", 1, 1, 0, 0);
     chaosChicken1.addItemEntry(<draconicevolution:chaos_shard> *2, 10);
     chaosChicken1.addItemEntry(<draconicevolution:chaos_shard> *3, 5);
     chaosChicken1.addItemEntry(<draconicevolution:chaos_shard> *4, 1);


print("Initialized 'LootTables.zs'");
