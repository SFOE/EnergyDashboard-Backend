# Energy Dashboard Backend & API - Releases

## v1.0.0 - 13.12.2022
Initial Release of Energy-Dashboard. Includes the basic setup and all functions and APIs for the initial release. The following KPIs and functionality are included:
- Overview: Strom, Gas, Wetter, Preise, Lagebeurteilung, Energie Sparen
- Ampel: Strom, Gas
- Dynamic Translations
- Strom: Verbrauch, Produktion, Füllstand Speicherseen, Import / Export
- Gas: Nettoimport, Füllstände Gasspeicher EU, Sparziel
- Preise: Strom, Gas, Heizöl, Treibstoff
- Wetter: Temperatur

## v1.1.0 - 22.12.2022
- Added version 2 APIs for the following KPIs to be able to manage year-end problems:
   - Strom: Verbrauch, Füllstand Speicherseen, Import/Export
   - Gas: Nettoimport, Füllstände Gasspeicher EU, Sparziel
   - Overview: Strom, Gas
- Added Speicherstand at 100 percent capacity for Füllstand Speicherseen
- Improved packaging and deployment of lambda functions
- Added API for Preise: Fernwärme and Brennholz

## v1.1.1 - 23.12.2022
Hotfix for Gas Sparziel on Overview

## v1.1.2 - 01.01.2023
Hotfix for Strom Produktionsmix due to year-end change

## v1.1.3 - 18.01.2023
Hotfix for missing Meteo Stations in weather data

## v1.2.0 - 26.01.2023
Feature Release for the following KPIs
- Strom Sparziel
- Preise Brennholz
- Preise Fernwärme

