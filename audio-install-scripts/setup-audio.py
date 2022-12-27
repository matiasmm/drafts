#!/usr/bin/python3

import os
import xml.etree.ElementTree as ET


FILE_SYS_SETTINGS = '/Library/Preferences/Audio/com.apple.audio.SystemSettings.plist'
FILE_DEV_SETTINGS = '/Library/Preferences/Audio/com.apple.audio.DeviceSettings.plist'


def value_to_object(value):
    return {}


class XmlParsable(object):
    def __init__(self) -> None:
        self.dict = {}

    def setDict(self, node):
        self.dict = {}
        stackDicts = [self.dict]
        stackNodes = [node]
        while (len(stackNodes) > 0):
            key = ''
            node = stackNodes.pop()
            dict = stackDicts.pop()
            for leef in node:
                if leef.tag == 'key':
                    key = leef.text
                elif leef.tag == 'array' or leef.tag == 'dict':
                    val = [] if leef.tag == 'array' else {}
                    if isinstance(dict, list):
                        dict.append(val)
                    else:
                        dict[key] = val
                    stackDicts.append(val)
                    stackNodes.append(leef)
                else:
                    dict[key] = str(leef.text)


class Device(XmlParsable):
    def __init__(self, name):
        super().__init__()
        self.name = name

    def has_input(self):
        return 'input streams' in self.dict

    def has_output(self):
        return 'output streams' in self.dict


class SystemSetting(XmlParsable):
    def __init__(self, node):
        super().__init__()
        self.name = node.text
        self.node = node


def list_devices():
    tree = ET.parse(FILE_DEV_SETTINGS)
    root = tree.getroot()

    device = None
    devices = []
    for leefs in root:
        for leef in leefs:
            if leef.tag == 'key':
                device = Device(leef.text)
                devices.append(device)
            elif device != None:
                device.setDict(leef)

    for device in devices:
        if device.has_output():
            print(device.name)
            print(device.dict)


def list_system_settings():
    # {'name': 'MyInterpreter', 'stacked': 'None', 'subdevices': [{'channels-in': '6', 'channels-out': '2', "don't pad": '0', 'drift': '0', 'drift algorithm': '0', 'drift quality': '127', 'latency-in': '0', 'latency-out': '0', 'name': 'MacBook Pro Speakers', 'uid': 'BuiltInSpeakerDevice'}, {'channels-in': '2', 'channels-out': '2', "don't pad": '0', 'drift': '0', 'drift algorithm': '0', 'drift quality': '127', 'latency-in': '0', 'latency-out': '0', 'name': 'DeviceName', 'uid': 'com.vbaudio.vbcable:B6E6D02E-CD32-4C95-B60B-2FC2621CA4E0'}], 'uid': '~:AMS2_StackedOutput:0'}
    tree = ET.parse(FILE_SYS_SETTINGS)
    root = tree.getroot()

    setting = None
    settings = []
    for leefs in root:
        for leef in leefs:
            if leef.tag == 'key':
                setting = SystemSetting(leef)
                settings.append(setting)
            elif setting != None:
                setting.setDict(leef)

    for setting in settings:
        print(setting.name)
        print(setting.dict)


list_system_settings()

# os.system("sudo launchctl stop com.apple.audio.coreaudiod")
# os.system("sudo launchctl start com.apple.audio.coreaudiod")
