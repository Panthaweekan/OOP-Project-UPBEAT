package GameConfig.Player;

import GameConfig.Region.Region;

import java.util.HashMap;
import java.util.Map;

public class GamePlayer implements Player{
    private final String name;
    private final long id;
    private long budget;
    private boolean life;
    private Region CityCenter; //location is row * col
    private final Map<String, Long> identifier;
    public GamePlayer(String name, long id, long budget, Region CityCenter) {
        this.name = name;
        this.id = id;
        this.budget = budget;
        this.life = true;
        this.CityCenter = CityCenter;
        this.identifier = new HashMap<>();
    }

    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public Long getID() {
        return this.id;
    }

    @Override
    public long getBudget() {
        return this.budget;
    }

    @Override
    public void updateBudget(long money) {
        this.budget = Math.max(0, this.budget + money);
    }

    @Override
    public int getCityCenterLocation() {
        return this.CityCenter.getLocation();
    }

    @Override
    public Region getCityCenter() {
        return this.CityCenter;
    }

    @Override
    public boolean life() {
        return this.life;
    }

    @Override
    public Map<String, Long> getIdentifiers() {
        return this.identifier;
    }

    @Override
    public void updateCityCenter(Region to) {
        CityCenter.updateOwner(null);
        CityCenter = to;
        CityCenter.updateOwner(this);
    }
}