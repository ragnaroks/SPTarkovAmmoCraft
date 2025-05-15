import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {IHideoutProduction} from '@spt/models/eft/hideout/IHideoutProduction';
import idcalc from '../helpers/idcalc';

const newId: string = '68266b2cad7d6512a9f29400';

const stuffsTemplateArray:Array<ItemTpl> = [
  ItemTpl.AMMO_20G_75MM,ItemTpl.AMMO_20G_73MM,ItemTpl.AMMO_20G_62MM,ItemTpl.AMMO_20G_56MM
];

export default function addCustomRecipe_20gb(logger: ILogger,tables: IDatabaseTables) {
  const productTemplate = tables.templates.items[ItemTpl.AMMO_20G_FLECHETTE] || null;
  if(!productTemplate){
    logger.error('[SPTarkovAmmoCraft]：addCustomRecipe_20gb，Error：template AMMO_20G_FLECHETTE not found');
    return;
  }
  const productionCount = productTemplate._props.StackMaxSize * 4;
  const gunpowderCount = Math.round(productTemplate._props.PenetrationPower/15);
  const totalValue = productTemplate._props.PenetrationPower * productTemplate._props.Damage * productionCount * productTemplate._props.ProjectileCount;
  for (const id of stuffsTemplateArray) {
    const template = tables.templates.items[id] || null;
    if(!template){continue;}
    const newRecipe:IHideoutProduction = {
      _id: idcalc(newId,stuffsTemplateArray.indexOf(id)+1),
      areaType: 5,
      requirements: [
        {
          areaType: 10,
          requiredLevel: 1,
          type: 'Area'
        },{
          templateId: ItemTpl.BARTER_TOOLSET,
          type: 'Tool'
        },{
          count: gunpowderCount,
          isEncoded: false,
          isFunctional: false,
          isSpawnedInSession: false,
          templateId: ItemTpl.BARTER_GUNPOWDER_EAGLE,
          type: 'Item'
        },{
          count: gunpowderCount,
          isEncoded: false,
          isFunctional: false,
          isSpawnedInSession: false,
          templateId: ItemTpl.BARTER_GUNPOWDER_HAWK,
          type: 'Item'
        },{
          count: gunpowderCount,
          isEncoded: false,
          isFunctional: false,
          isSpawnedInSession: false,
          templateId: ItemTpl.BARTER_GUNPOWDER_KITE,
          type: 'Item'
        },{
          count: Math.floor(totalValue / template._props.PenetrationPower / template._props.Damage / productTemplate._props.ProjectileCount),
          isEncoded: false,
          isFunctional: false,
          isSpawnedInSession: false,
          templateId: id,
          type: 'Item'
        }
      ],
      productionTime: 3600,
      endProduct: ItemTpl.AMMO_20G_FLECHETTE,
      isEncoded:false,
      locked: false,
      needFuelForAllProductionTime: false,
      continuous: false,
      count: productionCount,
      productionLimitCount: 0,
      isCodeProduction: false,
    };
    tables.hideout.production.recipes.push(newRecipe);
    logger.debug('[SPTarkovAmmoCraft]：addCustomRecipe_20gb，ID：' + newRecipe._id);
  }

  logger.success('[SPTarkovAmmoCraft]：addCustomRecipe_20gb，ID：' + newId);
}
