import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  Configurator,
  ConfiguratorGroupsService,
  GenericConfigurator,
} from '@spartacus/core';
import { ICON_TYPE } from '../../../misc/icon/icon.model';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-config-attribute-footer',
  templateUrl: './config-attribute-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAttributeFooterComponent {
  constructor(private configuratorGroupsService: ConfiguratorGroupsService) {}
  iconTypes = ICON_TYPE;

  @Input() attribute: Configurator.Attribute;
  @Input() owner: GenericConfigurator.Owner;
  @Input() groupId: string;

  showRequiredMessage(): Observable<boolean> {
    return this.configuratorGroupsService
      .isGroupVisited(this.owner, this.groupId)
      .pipe(
        take(1),
        map((result) => {
          if (
            (this.owner.type === GenericConfigurator.OwnerType.CART_ENTRY ||
              result) &&
            this.attribute.required &&
            this.attribute.incomplete &&
            this.attribute.uiType === Configurator.UiType.STRING &&
            !this.attribute.userInput
          ) {
            return true;
          }
          return false;
        })
      );
  }

  getRequiredMessageKey(): string {
    return 'configurator.attribute.defaultRequiredMessage';
  }
}
