import React from "react";
import { FlexPlugin } from "@twilio/flex-plugin";
import { CustomizationProvider } from "@twilio-paste/core/customization";
import WhatsAppMap from "./components/WhatsAppMap/WhatsAppMap";
import SimpleMap from "./components/Mapview/Mapview";
import InboundLocation from "./components/InboundLocation";
import OutboundLocation from "./components/OutboundLocation";
import LocationSentIndicator from "./components/LocationSentIndicator";

// register action handler
import {} from "./actions/sendMessage";

const PLUGIN_NAME = "FlexCbmWhatsappLocationPlugin";

export default class FlexCbmWhatsappLocationPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    flex.setProviders({
      PasteThemeProvider: CustomizationProvider,
    });

    flex.MessagingCanvas.Content.add(
      <InboundLocation key="inbound-location" />,
      {
        sortOrder: 100, // put the component last but don't align end or it ends up scrollable
      }
    );

    flex.MessagingCanvas.Content.add(
      <OutboundLocation key="outbound-location" />,
      {
        sortOrder: 0,
      }
    );
    flex.MessageListItem.Content.add(
      <LocationSentIndicator key="location-sent" />
    );

    // if an API key is setup use the right crm panel to show the map
    console.log(process.env.FLEX_APP_CLICKABLE_MAP);
    if (process.env.FLEX_APP_GOOGLE_MAPS_EMBED_API_KEY) {
      if (process.env.FLEX_APP_CLICKABLE_MAP === "true") {
        flex.AgentDesktopView.Panel2.Content.replace(<WhatsAppMap key="map" />);
      } else {
        flex.AgentDesktopView.Panel2.Content.replace(<SimpleMap key="map" />);
      }
    }
  }
}
