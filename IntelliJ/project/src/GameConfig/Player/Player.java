package GameConfig.Player;

import java.util.Map;

public interface Player {
    Long getID();
    String getName();
    double getBudget();
    void updateBudget(double money);
    void moveCityCrew(String direction);
    int[] getCityCrewLocation();
    int[] getCityCenterLocation();
    boolean life();
    long attack(String direction);
    Map<String,Long> getIdentifiers();
}