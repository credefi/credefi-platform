import { Component } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class UserDetailsComponent {
  currentPage = "User details"
  height = '1335px';

  svgIcon = 'sessionsApple';
  sessionName = 'TR5502TG';
  sessionLocation = 'Google chrome · Ukraine · 3:18';
  showxClose = '';

  svgIcon2 = 'sessionsWindows';
  sessionName2 = 'TR5502TG';
  sessionLocation2 = 'Google chrome · Ukraine · 3:18';
  showxClose2 = 'showxClose';

  svgIcon3 = 'sessionsAndroid';
  sessionName3 = 'TR5502TG';
  sessionLocation3 = 'Google chrome · Ukraine · 3:18';
  showxClose3 = 'showxClose';

  svgIcon4 = 'sessionsApple';
  sessionName4 = 'TR5502TG';
  sessionLocation4 = 'Google chrome · Ukraine · 3:18';
  showxClose4 = 'showxClose';
}
