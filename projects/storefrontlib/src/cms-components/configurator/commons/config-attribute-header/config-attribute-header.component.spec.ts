import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Configurator, I18nTestingModule } from '@spartacus/core';
import {
  IconLoaderService,
  IconModule,
} from '../../../../cms-components/misc/icon/index';
import { ICON_TYPE } from '../../../misc/icon/icon.model';
import { ConfigUIKeyGeneratorService } from '../service/config-ui-key-generator.service';
import { ConfigAttributeHeaderComponent } from './config-attribute-header.component';
import { ConfigComponentTestUtilsService } from '../../generic/service/config-component-test-utils.service';

export class MockIconFontLoaderService {
  useSvg(_iconType: ICON_TYPE) {
    return false;
  }
  getStyleClasses(_iconType: ICON_TYPE): string {
    return 'fas fa-exclamation-circle';
  }
  addLinkResource() {}
}

describe('ConfigAttributeHeaderComponent', () => {
  let classUnderTest: ConfigAttributeHeaderComponent;
  let fixture: ComponentFixture<ConfigAttributeHeaderComponent>;
  const currentAttribute: Configurator.Attribute = {
    name: 'attributeId',
    uiType: Configurator.UiType.RADIOBUTTON,
    images: [
      {
        url: 'someImageURL',
      },
    ],
  };
  let htmlElem: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, IconModule],
      declarations: [ConfigAttributeHeaderComponent],
      providers: [
        ConfigUIKeyGeneratorService,
        { provide: IconLoaderService, useClass: MockIconFontLoaderService },
      ],
    })
      .overrideComponent(ConfigAttributeHeaderComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigAttributeHeaderComponent);
    classUnderTest = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    classUnderTest.attribute = currentAttribute;
    classUnderTest.attribute.label = 'label of attribute';
    classUnderTest.attribute.name = '123';
    classUnderTest.attribute.incomplete = true;
    classUnderTest.attribute.required = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should provide public access to uiKeyGenerator', () => {
    expect(classUnderTest.uiKeyGenerator).toBe(
      TestBed.inject(ConfigUIKeyGeneratorService)
    );
  });

  it('should render a label', () => {
    ConfigComponentTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'label'
    );
    ConfigComponentTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-config-attribute-label',
      'label of attribute'
    );
    const id = htmlElem
      .querySelector('.cx-config-attribute-label')
      .getAttribute('id');
    expect(id.indexOf('123')).toBeGreaterThan(
      0,
      'id of label does not contain the StdAttrCode'
    );
    expect(
      htmlElem
        .querySelector('.cx-config-attribute-label')
        .getAttribute('aria-label')
    ).toEqual(classUnderTest.attribute.label);
    ConfigComponentTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-config-attribute-label-required-icon'
    );
  });

  it('should render a label as required', () => {
    classUnderTest.attribute.required = true;
    fixture.detectChanges();
    ConfigComponentTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-config-attribute-label-required-icon'
    );
  });

  it('should render an image', () => {
    ConfigComponentTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-config-attribute-img'
    );
  });
});
