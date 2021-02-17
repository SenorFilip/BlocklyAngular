import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Application, Loader, Sprite, Spritesheet, utils} from 'pixi.js';
import {CustomBlock, NgxBlocklyComponent, NgxBlocklyConfig, NgxBlocklyGeneratorConfig, NgxToolboxBuilderService} from 'ngx-blockly';
import {VehicleBlock} from '../../shared/custom.blocks';
import {VehicleModel} from '../vehicle.model';
import {AlertService} from '../../shared/alert';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lesson-classes-assignment',
  templateUrl: './lesson-classes-assignment.component.html',
  styleUrls: ['./lesson-classes-assignment.component.scss']
})
export class LessonClassesAssignmentComponent implements OnInit, OnDestroy {

  progress = 0;
  tasks = [
    {taskNum: 0, description: 'Pink van with golden rims', solution: new VehicleModel('van', 'pink', 'gold')},
    {taskNum: 1, description: 'Red car with bronze rims', solution: new VehicleModel('car', 'red', 'bronze')},
    {taskNum: 2, description: 'Grey truck with platinum rims', solution: new VehicleModel('truck', 'grey', 'platinum')}
  ];
  // index of current task
  currentVehicleTarget = this.tasks[0];
  buttonsDisabled = false;
  newVehicleIsAssembling = false;
  submittedVehicle: VehicleModel;
  currentVehicle: VehicleModel = new VehicleModel(undefined, undefined, undefined);
  rimsPosition = {
    car: [
      { x: 205, y: 390 },
      { x: 537, y: 390 }
    ],
    van: [
      { x: 242, Y: 390 },
      { x: 570, y: 390 }
    ],
    truck: [
      { x: 117, y: 390 },
      { x: 575, y: 390 },
      { x: 703, y: 390 }
    ]
  };
  defaultRimsPosition = [ -100, -240, -380 ];
  rimsMap = {
    gold: [],
    bronze: [],
    platinum: []
  };

  colorCodes = {
    red: 0xFF0000,
    blue: 0x0000FF,
    yellow: 0xFFFF11,
    pink: 0xFF69B4,
    grey: 0xA9A9A9,
    green: 0x008000
  };

  // PixiJS variables
  canvas: any;
  pixiApp: Application;
  rendererWidth: number;
  rendererHeight: number;
  sheet: Spritesheet;
  truckSprite: Sprite;
  carSprite: Sprite;
  vanSprite: Sprite;
  vehicleMap = {
    truck: undefined,
    car: undefined,
    van: undefined
  };
  bronzeRim1Sprite: Sprite;
  bronzeRim2Sprite: Sprite;
  bronzeRim3Sprite: Sprite;
  goldRim1Sprite: Sprite;
  goldRim2Sprite: Sprite;
  goldRim3Sprite: Sprite;
  platinumRim1Sprite: Sprite;
  platinumRim2Sprite: Sprite;
  platinumRim3Sprite: Sprite;

  // Blockly variables
  @ViewChild(NgxBlocklyComponent) workspace;
  code: string;

  public config: NgxBlocklyConfig = {
    scrollbars: true,
    trashcan: true,
    renderer: 'zelos'
  };

  public generatorConfig: NgxBlocklyGeneratorConfig = {
    dart: true,
    javascript: true,
    lua: true,
    php: true,
    python: true,
    xml: true
  };

  public customBlocks: CustomBlock[] = [
    new VehicleBlock('vehicle', null, null)
  ];

  constructor(private ngxToolboxBuilderService: NgxToolboxBuilderService,
              private router: Router,
              public alertService: AlertService) {
    this.ngxToolboxBuilderService.nodes = this.customBlocks;
    this.config.toolbox = this.ngxToolboxBuilderService.build();
  }

  ngOnInit(): void {
    this.canvas = document.getElementById('pixiJsClassesCanvas');
    this.rendererWidth = this.canvas.offsetWidth;
    this.rendererHeight = this.canvas.offsetHeight;

    this.pixiApp = new Application({
      view: this.canvas,
      resizeTo: this.canvas,
    });

    // adding spritesheet to loader if we already didn't
    if (Loader.shared.resources.spritesheet === undefined) {
      Loader.shared.add('spritesheet', 'assets/images/pixiJS/workshop/spritesheet.json');
    }
    Loader.shared.load(() => {
      this.setup();
    });

    this.pixiApp.ticker.add(() => {
      this.gameLoop();
    });
    this.pixiApp.ticker.maxFPS = 100;
  }

  setup() {
    // the sprite sheet we've just loaded:
    this.sheet = Loader.shared.resources.spritesheet.spritesheet;

    // initialize background sprite
    const background = new Sprite(this.sheet.textures['garage.png']);
    background.width = this.rendererWidth;
    background.height = this.rendererHeight;
    this.pixiApp.stage.addChild(background);

    this.bronzeRim1Sprite = this.createTruckRimSprite('bronze', [-100, 390]);
    this.bronzeRim2Sprite = this.createTruckRimSprite('bronze', [-240, 390]);
    this.bronzeRim3Sprite = this.createTruckRimSprite('bronze', [-380, 390]);
    this.goldRim1Sprite = this.createTruckRimSprite('gold', [-100, 390]);
    this.goldRim2Sprite = this.createTruckRimSprite('gold', [-240, 390]);
    this.goldRim3Sprite = this.createTruckRimSprite('gold', [-380, 390]);
    this.platinumRim1Sprite = this.createTruckRimSprite('platinum', [-100, 390]);
    this.platinumRim2Sprite = this.createTruckRimSprite('platinum', [-240, 390]);
    this.platinumRim3Sprite = this.createTruckRimSprite('platinum', [-380, 390]);

    this.truckSprite = new Sprite(this.sheet.textures['truck.png']);
    this.truckSprite.height = 550;
    this.truckSprite.width = 750;
    this.truckSprite.anchor.set(0.5);
    this.truckSprite.position.set(-380, 280);
    this.pixiApp.stage.addChild((this.truckSprite));
    this.vehicleMap.truck = this.truckSprite;

    this.vanSprite = new Sprite(this.sheet.textures['van.png']);
    this.vanSprite.height = 290;
    this.vanSprite.width = 620;
    this.vanSprite.anchor.set(0.5);
    this.vanSprite.position.set(-320, 300);
    this.pixiApp.stage.addChild((this.vanSprite));
    this.vehicleMap.van = this.vanSprite;

    this.carSprite = new Sprite(this.sheet.textures['car.png']);
    this.carSprite.height = 385;
    this.carSprite.width = 620;
    this.carSprite.anchor.set(0.5);
    this.carSprite.position.set(-320, 325);
    this.pixiApp.stage.addChild((this.carSprite));
    this.vehicleMap.car = this.carSprite;
  }

  submitVehicle() {
    this.buttonsDisabled = true;
    const topBlocks = this.workspace.workspace.getTopBlocks(true);
    if (topBlocks.length === 0) {
      this.buttonsDisabled = false;
      this.alertService.warn('You didn\'t submit any vehicle.', {autoClose: true});
      return;
    } else if (topBlocks.length > 1) {
      this.buttonsDisabled = false;
      this.alertService.warn('You submitted more than 1 vehicle.', {autoClose: true});
      return;
    }

    const type = topBlocks[0].getFieldValue('type');
    const color = topBlocks[0].getFieldValue('color');
    const rims = topBlocks[0].getFieldValue('rims');
    const submittedVehicle = new VehicleModel(type, color, rims);

    if (this.isVehicleEqual(submittedVehicle, this.currentVehicle)) {
      this.buttonsDisabled = false;
      this.alertService.warn('That\'s the same vehicle.', {autoClose: true});
      return;
    } else {
      this.submittedVehicle = submittedVehicle;
    }
    this.newVehicleIsAssembling = true;
  }

  gameLoop() {
    if (this.newVehicleIsAssembling) {
      // first the undefined rims
      if (this.currentVehicle.rims === undefined) {
        this.addRimsToVehicle(this.submittedVehicle.type, this.submittedVehicle.rims);
      }
      // then the undefined vehicle
      else if (this.currentVehicle.type === undefined) {
        this.addVehicleToWorkshop(this.submittedVehicle.type);
      }
      // then the undefined color
      else if (this.currentVehicle.color === undefined) {
        this.paintVehicle(this.submittedVehicle.color);
      }
      // if the vehicle type is different
      else if (this.submittedVehicle.type !== this.currentVehicle.type) {
        this.removeVehicleAndRimsFromWorkshop();
      }
      // if only the rims are different
      else if (this.submittedVehicle.rims !== this.currentVehicle.rims) {
        this.removeRimsFromWorkshop();
      }
      // if the color has changed
      else if (this.submittedVehicle.color !== this.currentVehicle.color) {
        this.paintVehicle(this.submittedVehicle.color);
      } else {
        this.checkIfSubmittedVehicleIsCorrect();
        this.newVehicleIsAssembling = false;
        this.buttonsDisabled = false;
      }
    }
  }

  addRimsToVehicle(type: string, rims: string) {
    let allRimsAdded = true;
    this.rimsPosition[type].forEach((wheelPosition, index) => {
      if (this.rimsMap[rims][index].x < wheelPosition.x) {
        this.rimsMap[rims][index].x += 3;
        allRimsAdded = false;
      }
    });
    if (allRimsAdded) {
      this.currentVehicle.rims = rims;
    }
  }

  addVehicleToWorkshop(type: string) {
    if (this.vehicleMap[type].x < this.rendererWidth / 2) {
      this.vehicleMap[type].x += 3;
    } else {
      this.currentVehicle.type = type;
    }
  }

  removeRimsFromWorkshop() {
    let rimsRemoved = true;
    this.rimsMap[this.currentVehicle.rims].forEach((rim, index) => {
      if (rim.x > this.defaultRimsPosition[index]) {
        rim.x -= 3;
        rimsRemoved = false;
      }
    });
    if (rimsRemoved) {
      this.currentVehicle.rims = undefined;
    }
  }

  removeVehicleAndRimsFromWorkshop() {
    let vehicleRemoved = true;
    if (this.vehicleMap[this.currentVehicle.type].x > -380) {
      this.vehicleMap[this.currentVehicle.type].x -= 3;
      vehicleRemoved = false;
    }
    this.rimsMap[this.currentVehicle.rims].forEach((rim, index) => {
      if (rim.x > this.defaultRimsPosition[index]) {
        rim.x -= 3;
        vehicleRemoved = false;
      }
    });
    if (vehicleRemoved) {
      this.currentVehicle.rims = undefined;
      this.currentVehicle.type = undefined;
    }
  }

  paintVehicle(color: string) {
    this.vehicleMap[this.currentVehicle.type].tint = this.colorCodes[color];
    this.currentVehicle.color = color;
  }

  isVehicleEqual(newVehicle: VehicleModel, currentVehicle: VehicleModel) {
    if (currentVehicle === undefined) {
      return false;
    }
    return newVehicle.type === currentVehicle.type &&
      newVehicle.color === currentVehicle.color &&
      newVehicle.rims === currentVehicle.rims;
  }

  createTruckRimSprite(rimType: string, coordinates: number[]) {
    const rim = new Sprite(this.sheet.textures[rimType + 'Rims.png']);
    rim.height = 120;
    rim.width = 185;
    rim.anchor.set(0.5);
    rim.position.set(coordinates[0], coordinates[1]);
    this.pixiApp.stage.addChild((rim));
    this.rimsMap[rimType].push(rim);
    return rim;
  }

  checkIfSubmittedVehicleIsCorrect() {
    if (this.isVehicleEqual(this.currentVehicle, this.currentVehicleTarget.solution)) {
      if (this.currentVehicleTarget.taskNum < 2) {
        this.progress += 33;
        const currentIndex = this.currentVehicleTarget.taskNum;
        this.currentVehicleTarget = this.tasks[currentIndex + 1];
        this.alertService.success('Nice! Now create the next vehicle.', {autoClose: true});
      } else {
        this.progress += 34;
        this.alertService.success('Good job. Let\'s go the next part.');
        setTimeout(() => this.router.navigate(['classesLesson']), 1800);
      }
    } else {
      this.alertService.error('Nope. Wrong vehicle.', {autoClose: true});
    }
  }

  onCode(code: string) {
    this.code = code;
  }

  ngOnDestroy(): void {
    // clears images from cache and loader
    Loader.shared.reset();
    utils.clearTextureCache();
  }

}
