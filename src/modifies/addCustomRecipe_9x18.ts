import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {IHideoutProduction} from '@spt/models/eft/hideout/IHideoutProduction';
import idcalc from '../helpers/idcalc';

const newId: string = '682642f1b035d153a090f400';

const stuffsTemplateArray:Array<ItemTpl> = [
  ItemTpl.AMMO_9X18PM_PSTM,ItemTpl.AMMO_9X18PM_BZHT,ItemTpl.AMMO_9X18PM_RG028,ItemTpl.AMMO_9X18PM_PST,ItemTpl.AMMO_9X18PM_PPT,
  ItemTpl.AMMO_9X18PM_PPE,ItemTpl.AMMO_9X18PM_PRS,ItemTpl.AMMO_9X18PM_PS_PPO,ItemTpl.AMMO_9X18PM_P,ItemTpl.AMMO_9X18PM_PSO,
  ItemTpl.AMMO_9X18PM_PSV,ItemTpl.AMMO_9X18PM_SP7,ItemTpl.AMMO_9X18PM_SP8
];

export default function addCustomRecipe_9x18(logger: ILogger,tables: IDatabaseTables) {
  const productTemplate = tables.templates.items[ItemTpl.AMMO_9X18PM_PBM] || null;
  if(!productTemplate){
    logger.error('[SPTarkovAmmoCraft]：addCustomRecipe_9x18，Error：template AMMO_9X18PM_PBM not found');
    return;
  }
  const productionCount = productTemplate._props.StackMaxSize * 4;
  const totalValue = productTemplate._props.PenetrationPower * productTemplate._props.Damage * productionCount;
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
          count: Math.round(productTemplate._props.PenetrationPower / 10),
          isEncoded: false,
          isFunctional: false,
          isSpawnedInSession: false,
          templateId: ItemTpl.BARTER_GUNPOWDER_KITE,
          type: 'Item'
        },{
          count: Math.round(totalValue / template._props.PenetrationPower / template._props.Damage),
          isEncoded: false,
          isFunctional: false,
          isSpawnedInSession: false,
          templateId: id,
          type: 'Item'
        }
      ],
      productionTime: 3600,
      endProduct: ItemTpl.AMMO_9X18PM_PBM,
      isEncoded:false,
      locked: false,
      needFuelForAllProductionTime: false,
      continuous: false,
      count: productionCount,
      productionLimitCount: 0,
      isCodeProduction: false,
    };
    tables.hideout.production.recipes.push(newRecipe);
    logger.debug('[SPTarkovAmmoCraft]：addCustomRecipe_9x18，ID：' + newRecipe._id);
  }

  logger.success('[SPTarkovAmmoCraft]：addCustomRecipe_9x18，ID：' + newId);
}
